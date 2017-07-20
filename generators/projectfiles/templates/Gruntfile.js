/**
 * Gruntfile.js for Application UI5 Development
 *
 * This Gruntfile has been specifically designed to allow UI5 applications to
 * be tested, built and deployed to an ABAP Gateway system.
 *
 * @author Oliver Rogers - Bluefin Solutions
 * @since 19-May-2017
 */

/* Configure eslint for a Gruntfile */
/* eslint-env node */
/* eslint camelcase: ["error", {properties: "never"}] */
/* eslint-disable no-process-env */

module.exports = function (grunt) {
    "use strict";

    // Read configuration from package.json
    var cfg = grunt.file.readJSON("package.json").bluefin;

    // Project configuration.
    grunt.initConfig({
        clean: {
            // Clean build folder...
            build: [
                "build/*",
                "!build/.UI5Repository*" // ...but don't remove .UI5Repository files
            ],

            // Clean the UI5 Sources folder...
            ui5: [
                "ui5/*",
                "!ui5/.gitkeep" // ... but skip the keep file
            ],

            // Remove the UI5 zip file (keeping the build artifacts small)
            ui5_zip: [
                "ui5/ui5.zip"
            ]
        },

        eslint: {
            // Code quality checks with ES-Lint
            ui5con: {
                options: {
                    configFile: ".eslintrc",
                    maxWarnings: "0"
                },
                src: [
                    "Gruntfile.js",
                    "src/**/*.js"
                ]
            }
        },

        xml_validator: {
            // XML Quality checks of all src xml files
            // Note: This doesn't check schema usage/tag correctness
            ui5_views: {
                src: ["src/**/*.view.xml"]
            }
        },

        copy: {
            // Copy everything to `build` Folder
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: ["**/*.*"],
                        dest: "build/"
                    }
                ]
            }
        },

        openui5_preload: {
            // openui5_preload compresses all source files into a single .json file
            app: {
                options: {
                    resources: [
                        {
                            cwd: "build",
                            prefix: cfg["ui5-name"],
                            src: [
                                "**/*.js",
                                "**/*.fragment.html",
                                "**/*.fragment.json",
                                "**/*.fragment.xml",
                                "**/*.view.html",
                                "**/*.view.json",
                                "**/*.view.xml",
                                "**/*.properties",
                                "**/manifest.json"
                            ]
                        }
                    ],
                    dest: "build/"
                },
                components: cfg["ui5-name"]
            }
        },

        nwabap_ui5uploader: {
            // Task to upload code to development system after build
            options: {
                conn: {
                    server: cfg["abap-hostname"],
                    useStrictSSL: false
                },
                auth: {
                    user: process.env.USER,
                    pwd:  process.env.PASSWD
                }
            },
            upload: {
                options: {
                    ui5: {
                        package: cfg["abap-package"],
                        bspcontainer: cfg["abap-bsp"],
                        bspcontainer_text: cfg["abap-bsp-text"],
                        transportno: process.env.ABAP_TRANSPORT,
                        calc_appindex: true
                    },
                    resources: {
                        cwd: "build",
                        src: "**/*.*"
                    }
                }
            }
        },

        ui5_version: {
            // Version the application based on current GIT commit/tag
            ui5con: {
                options: {
                    spacing: 2
                },
                src: "build/manifest.json",
                dest: "build/manifest.json"
            }
        },

        ui5_tester_toolkit: {
            options: { },
            default_options: {
                options: {
                    url: "http://localhost:8050/index.html"
                }
            }
        },

        if: {
            need_to_download_ui5: {
                options: {
                    /**
                     * Test if the UI5 resources have been downloaded yet and if
                     * their version and type are those required.
                     *
                     * @returns {boolean} True iff we need to download UI5
                     */
                    test: function () {
                        var result = true,
                            versions = {};

                        try {
                            // Try to read version file from downloaded UI5 sdk/runtime
                            versions = grunt.file.readJSON("ui5/sap-ui-version.json");
                            // Match version and type (SDK for XML validation)
                            result = versions.version !== cfg["ui5-version"] || versions.type !== cfg["ui5-type"];
                        } catch (e) {
                            // Default is we re-download UI5
                            result = true;
                        }

                        return result;
                    }
                },
                // Download UI5 if not present
                ifTrue: [
                    "clean:ui5",                    // (1) Remove any old UI5 (Use clean)
                    "download:ui5",                 // (2) Download the new UI5 ZIP File
                    "unzip:ui5",                    // (3) Unzip the newly downloaded file
                    "clean:ui5_zip",                // (4) Remove the zip file
                    "json_generator:ui5_version"    // (5) Write version file (for next time)
                ]
            }
        },

        download: {
            ui5: {
                src: "https://openui5.hana.ondemand.com/downloads/openui5-" + cfg["ui5-type"] + "-" + cfg["ui5-version"] + ".zip",
                dest: "ui5/ui5.zip"
            }
        },

        unzip: {
            ui5: {
                src: "ui5/ui5.zip",
                dest: "ui5/"
            }
        },

        json_generator: {
            ui5_version: {
                dest: "ui5/sap-ui-version.json",
                options: {
                    version: cfg["ui5-version"],
                    type: cfg["ui5-type"]
                }
            }
        },

        qunit: cfg["qunit-tests"].reduce(function (tests, test) {
            tests[test.name] = {
                options: {urls: test.urls}
            };
            return tests;
        }, {}),

        connect: {
            server: {
                options: {
                    port: 8050
                }
            },
            dev: {
                options: {
                    port: 8555,
                    keepalive: true
                }
            }
        },

        openui5_connect: {
            server: {
                options: {
                    appresources: "build",
                    resources: "ui5/resources"
                }
            },
            dev: {
                options: {
                    appresources: "src",
                    resources: "ui5/resources"
                }
            }
        }
    });

    // Require all necessary grunt plugins in package.json
    require("load-grunt-tasks")(grunt, {pattern: ["grunt-*", "@*/grunt-*", "gruntify-*"]});

    // To run a test on code quality of the sources
    // > grunt quality
    grunt.registerTask("quality", ["eslint", "xml_validator"]);

    // To download the correct version of UI5
    // > grunt downloadUI5
    grunt.registerTask("downloadUI5", ["if:need_to_download_ui5"]);

    // To build the application, run:
    // > grunt build
    grunt.registerTask("build", ["clean:build", "copy", "ui5_version", "openui5_preload"]);

    // To run all OPA tests through QUnit, run:
    // > grunt test
    grunt.registerTask("test", ["openui5_connect:server", "qunit"]);

    // To deploy the app to ABAP, run:
    // > grunt deploy
    grunt.registerTask("deploy", ["nwabap_ui5uploader"]);

    // Default task is to download UI5 and run the local server to develop on, run:
    // > grunt
    grunt.registerTask("default", ["downloadUI5", "openui5_connect:dev"]);
};
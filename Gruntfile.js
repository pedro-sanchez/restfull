module.exports = function(grunt) {
	var webappDir = 'src/main/webapp/';
	var cssDir = webappDir + 'resources/css/';
	var jsDir = webappDir + 'resources/js/';
	var imgDir = webappDir + 'resources/img/';
	var angularDir = webappDir + 'resources/app/';
	var componentDir = webappDir + 'resources/components/';

	var dstDir = webappDir + 'public/';
	var bowerDir = dstDir + 'vendor/';
	var dstAngularDir = dstDir + 'resources/app/';
	var dstComponentDir = dstDir + 'resources/components/';
	var dstCssDir = dstDir + 'resources/css/';
	var dstJsDir = dstDir + 'resources/js/';
	var dstImgDir = dstDir + 'resources/img/';

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		clean : [ dstDir ],
		bower : {
			install : {
				options : {
					targetDir : bowerDir,
					layout: "byComponent",
                    cleanTargetDir: false
				}
			}
		},
		copy : {
			images_css : {
				expand : true,
				cwd : cssDir,
				src : [ 'img/*' ],
				dest : dstCssDir
			},
			images : {
				expand : true,
				cwd : imgDir,
				src : [ '**/*' ],
				dest : dstImgDir
			},
			componets : {
				expand : true,
				cwd : componentDir,
				src : [ '**/*' ],
				dest : dstComponentDir
			}
		},
		uglify : {
			dist : {
				options : {
					compress : {
						warnings : false
					},
					report : 'min'
				},
				src : [ jsDir + '*.js' ],
				dest : dstJsDir + 'all.js'
			},
			build : {
				files : [ {
					expand : true,
					src : '**/*.js',
					dest : dstAngularDir,
					cwd :  angularDir,
					ext : '.min.js'
				} ]
			}
		},

		less : {
			dist : {
				options : {
					compress : true,
					yuicompress : true,
					report : 'min'
				},
				src : [ cssDir + '*.less', cssDir + '*.css' ],
				dest : dstCssDir + 'all.css'
			}
		}
	});

	grunt.registerTask('default', [ 'bower:install', 'uglify', 'less', 'copy' ]);

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');

};
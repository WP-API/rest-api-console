module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		sass: {
			dist: {
				files: {
					'style.css': 'templates/sass/**/*.scss'
				}
			}
		},
		browserify: {
			dist: {
				files: {
					'app.js': 'lib/**/*.js'
				},
				options: {
					transform: ['uglifyify']
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-browserify');

	// Default task(s).
	grunt.registerTask('default', ['uglify', 'sass', 'browserify']);

};

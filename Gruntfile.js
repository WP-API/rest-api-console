module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-browserify');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'browserify']);

};


Metalsmith = require 'metalsmith'
jade = require 'metalsmith-jade'
stylus = require 'metalsmith-stylus'
asset = require 'metalsmith-static'

metalsmith = Metalsmith __dirname

metalsmith.use jade()

metalsmith.use stylus
  compress: true
  nib: true

# metalsmith.use asset
#   src: 'public'
#   dest: '.'

metalsmith.build (err) ->
  console.error err if err
  console.log 'done'

import { Console } from '@virtualpatterns/mablung-console'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'

const FilePath = __filePath

const LogPath = FilePath.replace('/release/', '/data/').replace('.test.js', '.log')

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  return FileSystem.remove(LogPath)
})

Test.serial('Console(\'...\')', (test) => {
  test.notThrows(() => { (new Console(LogPath)).close() })
})

Test.serial('Console(\'...\', { ... })', (test) => {
  test.notThrows(() => { (new Console(LogPath, {})).close() })
})

Test.serial('Console(\'...\', { ... }, { ... })', (test) => {
  test.notThrows(() => { (new Console(LogPath, {}, {})).close() })
})

Test.serial('close()', (test) => {
  test.notThrows(() => { (new Console(LogPath)).close() })
})

;[
  'debug',
  'info',
  'warn',
  'error',
  'log',
  'dir'
].forEach((methodName) => {

  Test.serial(`${methodName}('...')`, (test) => {
    test.notThrows(() => {

      let _console = new Console(LogPath)

      try {
        _console[methodName](`Console#${methodName}('...')`)
      } finally {
        _console.close()
      }

    })
  })

})

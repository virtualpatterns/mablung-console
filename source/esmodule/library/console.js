import { Configuration } from '@virtualpatterns/mablung-configuration'
import { Console as BaseConsole } from 'console'
import FileSystem from 'fs-extra'

class Console {

  constructor(userStreamPath, userStreamOption = {}, userConsoleOption = {}) {

    let streamPath = userStreamPath
    let streamOption = Configuration.getOption(this.defaultStreamOption, userStreamOption)

    let consoleOption = Configuration.getOption(this.defaultConsoleOption, userConsoleOption)

    let stream = FileSystem.createWriteStream(streamPath, streamOption)
    let _console = new BaseConsole(Configuration.getOption(consoleOption, { 'stderr': stream, 'stdout': stream }))

    this.stream = stream
    this.console = _console

  }

  get defaultStreamOption() {
    return {
      'autoClose': true,
      'emitClose': false,
      'encoding': 'utf8',
      'flags': 'a+'
    }
  }

  get defaultConsoleOption() {
    return {
      'colorMode': false,
      'ignoreErrors': false
    }
  }

  close() {

    this.stream.close()

    delete this.console
    delete this.stream

  }

}

[
  'debug',
  'info',
  'warn',
  'error',
  'log',
  'dir'
].forEach((methodName) => {
  Console.prototype[methodName] = function (...argument) {
    this.console[methodName](...argument)
  }
})

export { Console }
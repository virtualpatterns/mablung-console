import Test from 'ava'

;[
  'Console'
].forEach((name) => {

  Test(name, async (test) => {
    test.truthy(await import('@virtualpatterns/mablung-console').then((module) => module[name]))
  })
  
})

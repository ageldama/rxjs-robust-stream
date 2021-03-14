import { Subject, of } from 'rxjs'
import { flatMap, switchMap, map, catchError } from 'rxjs/operators'
import $ from 'jquery'

function addResult(n) {
  $('#results').append(`<li>${n}</li>`)
}

function filterNum(n) {
  if (n % 3 === 0) {
    throw new Error(`multiple of three! ${n}`)
  }
  return n
}

const incCount$ = new Subject()

incCount$
  .pipe(
    switchMap((n) => {
      return of(n).pipe(
        map(filterNum),
        catchError((err) => {
          console.log('ERR', err)
          return of('HANDLED')
        })
      )
    })
  )
  .subscribe(
    addResult,
    (err) => console.log('GOT ERR', err),
    () => console.log('COMPLETE')
  )

$(() => {
  let count = 0

  $('#doItBtn').click(() => {
    incCount$.next(++count)
  })
})

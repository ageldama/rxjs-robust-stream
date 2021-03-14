import { Subject, of } from 'rxjs'
import { flatMap, switchMap, map, catchError } from 'rxjs/operators'
import $ from 'jquery'

class Incrementor {
  constructor(resultsElemId) {
    this.resultsElemId = resultsElemId

    this.incCount1$ = new Subject()
    this.initIncCount1$()

    this.incCount2$ = new Subject()
    this.initIncCount2$()
  }

  addResult(n) {
    $(this.resultsElemId).append(`<li>${n}</li>`)
  }

  filterNum(n) {
    if (n % 3 === 0) {
      throw new Error(`multiple of three! ${n}`)
    }
    return n
  }

  initIncCount1$() {
    this.incCount1$
      .pipe(
        switchMap((n) => {
          return of(n).pipe(
            map(this.filterNum),
            catchError((err) => {
              console.log('ERR', err)
              return of('HANDLED')
            })
          )
        })
      )
      .subscribe(
        (n) => this.addResult(n),
        (err) => console.log('GOT ERR', err),
        () => console.log('COMPLETE')
      )
  }

  initIncCount2$() {
    this.incCount2$
      .pipe(
        flatMap((n) => {
          return of(n).pipe(
            map(this.filterNum),
            catchError((err) => {
              console.log('ERR', err)
              return of('HANDLED')
            })
          )
        })
      )
      .subscribe(
        (n) => this.addResult(n),
        (err) => console.log('GOT ERR', err),
        () => console.log('COMPLETE')
      )
  }
}

$(() => {
  const incrementor1 = new Incrementor('#results1')
  let count1 = 0

  $('#doItBtn1').click(() => {
    incrementor1.incCount1$.next(++count1)
  })

  const incrementor2 = new Incrementor('#results2')
  let count2 = 0

  $('#doItBtn2').click(() => {
    incrementor2.incCount2$.next(++count2)
  })
})

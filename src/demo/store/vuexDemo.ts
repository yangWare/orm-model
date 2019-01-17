const state = (p: any) => {}
const action = (p: any, q: any) => {}
const mutation = (p: any) => { return (p: any, q: any) => {}}

@state
export default class xxModule {
  property1: number = 1
  property2: number = 2

  @action
  async doAction () {
    // do action
  }

  @mutation('mutation1')
  doMutation () {
    // do mutation
  }
}

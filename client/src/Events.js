export default {
  _cbs: [],
  notify (eventName) {
    this._cbs.map(cb => {
      if (cb.eventName === eventName && typeof cb.callback === 'function') {
        cb.callback()
      }
    })
  },
  on (eventName, cb) {
    this._cbs.push({
      eventName: eventName,
      callback: cb
    })
  }
}

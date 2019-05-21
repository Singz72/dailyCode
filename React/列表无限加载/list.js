import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import ProductCard from '../productCard/productCard'
import './invisibleItems.scss'

export default class InvisibleItems extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      windowHeight: 0,
      height: 100,
      lastScrollTop: null,
      distance: 100,
      paddingTopHeight: 0,
      paddingMarginHeight: 0,
      canLoadmore: true,
      canScroll: true,
      list: [],
      previewList: [],
      _rowsInWindow: null, // 可视区域行数
      _above: null, // 可视区域上部行数
      _below: null, // 可视区域下部行数
      _max: null // 可是区域滚动高度
    }
  }

  componentDidMount() {
    const systemInfo = Taro.getSystemInfoSync()
    const { height } = this.state
    const _rowsInWindow = Math.ceil(systemInfo.windowHeight / height)
    this.setState({
      windowHeight: systemInfo.windowHeight,
      _rowsInWindow,
      _above: _rowsInWindow * 2,
      _below: _rowsInWindow,
      _max: _rowsInWindow * height
    })
    let list = []
    let previewList = []
    for (let i = 0, l = 50; i < l; i += 1) {
      list.push(i)
      if (i < _rowsInWindow * 4) {
        previewList.push(i)
      }
    }
    this.setState({
      list,
      previewList
    })
  }

  handleScroll(e) {
    const {
      height,
      lastScrollTop,
      _max,
      distance,
      from,
      to,
      canScroll,
      list,
      _rowsInWindow,
      _below,
      _above,
      windowHeight
    } = this.state

    let _scrollTop = e.detail.scrollTop // 上滑高度
    let _height = e.detail.scrollHeight // 列表总高度
    let _contentHeight = windowHeight // 滚动区域可视高度

    // if the maximum height is exceeded, reset the previewList
    if (lastScrollTop === null || Math.abs(_scrollTop - lastScrollTop) > _max) {
      this.setState({
        lastScrollTop: _scrollTop
      })
    } else {
      if (
        to === list.length &&
        _height - _scrollTop - _contentHeight < distance
      ) {
        console.log(canScroll)
        canScroll && this.loadmore(from, to)
      }
      return
    }

    let _from = parseInt(_scrollTop / height) - _above
    if (_from < 0) {
      _from = 0
    }
    let _to = _from + _above + _below + _rowsInWindow
    if (_to > list.length) {
      _to = list.length
    }
    this.setState({
      from: _from,
      to: _to
    })

    const paddingTopHeight = _from * height
    const paddingMarginHeight = (list.length - _to) * height
    this.setState({
      paddingTopHeight,
      paddingMarginHeight
    })
    this.resetPreviewList(_from, _to)
  }

  timer = null

  loadmore(from, to) {
    //为嘛没能在多次调用时清除掉之前调用产生的计时器
    const { canLoadmore, _below, height, list } = this.state
    if (!canLoadmore) return
    this.setState({
      canLoadmore: false,
      canScroll: false
    })
    // fetch mock
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      console.log('laodmore')
      for (let i = to; i < to + 50; i++) {
        list.push(i)
      }
      let _from = from
      let _to = to + _below
      this.setState({
        canLoadmore: true,
        canScroll: true,
        paddingMarginHeight: (list.length - _to) * height
      })
      this.resetPreviewList(_from, _to, list)
    }, 2000)
  }

  resetPreviewList(from, to, list) {
    // reset previewList
    list = list || this.state.list
    let previewList = []
    for (; from < to; from += 1) {
      previewList.push(list[from])
    }
    this.setState({
      previewList,
      list
    })
  }

  render() {
    const {
      previewList,
      windowHeight,
      paddingTopHeight,
      paddingMarginHeight
    } = this.state
    const screenHeight = {
      height: `${windowHeight}px`
    }
    const scrollView = {
      paddingTop: `${paddingTopHeight}px`,
      paddingMargin: `${paddingMarginHeight}px`
    }
    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollY
        scrollWithAnimation
        style={screenHeight}
      >
        <View
          className='scrollView'
          style={scrollView}
          ref={n => (this.scrollViewDom = n)}
        >
          {previewList.map((item, index) => {
            return (
              <View key={index} className='listItem'>
                <ProductCard info={item} />
              </View>
            )
          })}
          <View class='load-more-gif'>loading...</View>
        </View>
      </ScrollView>
    )
  }
}

import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './productCard.scss'

export default class ProductCard extends Component{
  constructor(){
    super(...arguments)
  }

  render(){
    const {info} = this.props
    return (
      <View className='card'>
        <View className='card_box'>{info}</View>
      </View>
    );
  }
}

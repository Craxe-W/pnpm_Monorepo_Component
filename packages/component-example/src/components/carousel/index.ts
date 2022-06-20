import './carousel.less';
import { Carousel } from './carousel';
import { CarouselItem } from './carousel-item';
import { attachPropertiesToComponent } from '../../utils/attach-properties-to-component';

export default attachPropertiesToComponent(Carousel, {
  Item: CarouselItem,
});

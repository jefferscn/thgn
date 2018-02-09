import { withNavigation } from 'react-navigation';
import DynamicItemHOC from '../page/DynamicItemHOC';
/** This is a description of the generateTabRouteConfig function.
 * @param {Array} data - The tab list
 * @return {Object} routeConfig for TabNavigator
* */
function generateTabRouteConfig(data) {
    const routeConfig = {};
    data.forEach((item) => {
        routeConfig[item.key] = {
            screen: withNavigation(DynamicItemHOC(item)),
        };
    });
    return routeConfig;
}
export default generateTabRouteConfig;

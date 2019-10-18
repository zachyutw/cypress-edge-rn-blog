import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen/HomeScreen';
import WorkScreen from './WorkScreen/WorkScreen';
import ModalScreen from './ModalScreen/ModalScreen';
const MainStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Work: { screen: WorkScreen }
    },
    {
        initialRouteName: 'Home'
    }
);

const RootStack = createStackNavigator(
    {
        Home: { screen: MainStack },
        Modal: { screen: ModalScreen }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(RootStack);

// class Routes extends React.Component {
//     someEvent () {
//         // call navigate for AppNavigator here:
//         this.navigator && this.navigator.dispatch(NavigationActions.navigate({ routeName: someRouteName }));
//     }
//     render () {
//         return (
//             <AppContainer
//                 ref={(nav) => {
//                     this.navigator = nav;
//                 }}
//             />
//         );
//     }
// }
export default AppContainer;

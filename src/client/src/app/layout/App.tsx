import { RouterProvider } from 'react-router-dom';
import { MainNavigator } from '../navigation/MainNavigator';

const App = () => {

  return (
    <RouterProvider router={MainNavigator} />
  );
}

export default App;

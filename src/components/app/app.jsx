import AppContent from "../app-content/app-content";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { data } from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <>
      <AppHeader />
      <AppContent>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </AppContent>
    </>
  );
}

export default App;

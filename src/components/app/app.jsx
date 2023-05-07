import AppContent from "../app-content/app-content";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { data } from "../../utils/data";

function App() {
  return (
    <>
      <AppHeader />
      <AppContent>
        <BurgerIngredients ingredients={data} />
      </AppContent>
    </>
  );
}

export default App;

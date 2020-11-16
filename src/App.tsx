import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { newspaperOutline, podiumOutline, flagOutline } from 'ionicons/icons';
import News from './pages/News';
import Standings from './pages/Standings';
import Races from './pages/Races';
import RaceDetails from './pages/RaceDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';

/* Theme variables */
import './theme/variables.css';

/* Global styles */
import './App.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/news" component={News} exact={true} />
          <Route path="/standings" component={Standings} exact={true} />
          <Route path="/races" component={Races} exact={true}/>
          <Route path="/race/:season/:round" component={RaceDetails} />
          <Route path="/" render={() => <Redirect to="/news" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="news" href="/news">
            <IonIcon icon={newspaperOutline} />
            <IonLabel>News</IonLabel>
          </IonTabButton>
          <IonTabButton tab="standings" href="/standings">
            <IonIcon icon={podiumOutline} />
            <IonLabel>Standings</IonLabel>
          </IonTabButton>
          <IonTabButton tab="races" href="/races">
            <IonIcon icon={flagOutline} />
            <IonLabel>Races</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
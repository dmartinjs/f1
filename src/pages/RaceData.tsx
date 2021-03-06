import React, { useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonSlides, IonSlide, IonGrid, IonRow, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { slideOptions } from '../utils/SlideOptions';
import Positions from '../components/race/data/Positons';
import LapTimes from '../components/race/data/LapTimes';
import PitStops from '../components/race/data/PitStops';

interface RaceDataProps extends RouteComponentProps<{
  season: string,
  round: string,
  driverId: string
}> {}

const RaceData: React.FC<RaceDataProps> = ({match}) => {
  const [selectedSegment, SetSelectedSegment] = useState<string>('positions');

  const slider = useRef<HTMLIonSlidesElement>(null);

  const onSegmentChange = (event: CustomEvent) => {
    SetSelectedSegment(event.detail.value);

    switch(event.detail.value) {
      case 'positions':
        slider.current!.slideTo(0);
        break;
      case 'laptimes':
        slider.current!.slideTo(1);
        break;
      case 'pitstops':
        slider.current!.slideTo(2);
        break;
    }
  }

  const onSlideChange = (event: any) => {
    event.target.getActiveIndex().then((value: any) => {
      switch(value) {
        case 0:
          SetSelectedSegment('positions');
          break;
        case 1:
          SetSelectedSegment('laptimes');
          break;
        case 2:
          SetSelectedSegment('pitstops');
          break;
      }
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/standings"></IonBackButton>
          </IonButtons>
          <IonTitle>Data</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment onIonChange={onSegmentChange} value={selectedSegment} scrollable>
            <IonSegmentButton value="positions">
              <IonLabel>Positions</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="laptimes">
              <IonLabel>Lap Times</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="pitstops">
              <IonLabel>Pit Stops</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides onIonSlideDidChange={onSlideChange} ref={slider} options={slideOptions}>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <Positions season={match.params.season} round={match.params.round} driverId={match.params.driverId} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <LapTimes season={match.params.season} round={match.params.round} driverId={match.params.driverId} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <PitStops season={match.params.season} round={match.params.round} driverId={match.params.driverId} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default RaceData;

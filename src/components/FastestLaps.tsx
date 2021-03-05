import React, { useEffect, useState } from 'react';
import { IonBadge, IonItem, IonLabel, IonList, IonSkeletonText } from '@ionic/react';
import { Result } from '../models';

const FastestLaps: React.FC<{season?: string, round?: string}> = ({season, round}) => {
  const [results, setResults] = useState<[Result] | null>(null);

  useEffect(() => {
    fetch(`https://ergast.com/api/f1/${season}/${round}/results.json`)
      .then(res => res.json())
      .then(result => setResults(result.MRData.RaceTable.Races[0].Results));
  }, [season, round]);

  if (results === null) {
    return (
      <IonList lines="full">
        {[...Array(20)].map((item, index) =>
          <IonItem key={index}>
            <div className="race-position ion-margin-end"></div>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList lines="full">
      <IonItem>
        <div className="race-position ion-margin-end">
          No
        </div>
        <IonLabel>
          Driver
        </IonLabel>
        <div slot="end" className="race-time">
          Time
        </div>
      </IonItem>
      {results && results.map(result =>
        <IonItem key={result.position}>
          <div className="race-position ion-margin-end font-weight-bold">
            {result.position}.
          </div>
          <IonLabel>
            <h3>{result.Driver.givenName} <strong className="ion-text-uppercase">{result.Driver.familyName}</strong></h3>
          </IonLabel>
          <div slot="end" className="race-time">
            {result.FastestLap.Time.time}
          </div>
        </IonItem>
      )}
    </IonList>
  );
};

export default FastestLaps;
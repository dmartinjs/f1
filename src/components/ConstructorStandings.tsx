import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonBadge, IonAvatar, IonSkeletonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { ConstructorStanding, DriverStanding } from '../models';

const ConstructorStandings: React.FC = () => {
  let history = useHistory();
  const [constructors, setConstructors] = useState<[ConstructorStanding] | null>(null);
  const [drivers, setDrivers] = useState<[DriverStanding] | null>(null);

  useEffect(() => {
    fetch('https://ergast.com/api/f1/current/driverStandings.json')
      .then(res => res.json())
      .then(result => setDrivers(result.MRData.StandingsTable.StandingsLists[0].DriverStandings));

    fetch('https://ergast.com/api/f1/current/constructorStandings.json')
      .then(res => res.json())
      .then(result => setConstructors(result.MRData.StandingsTable.StandingsLists[0].ConstructorStandings));
  }, []);

  const _handleClick = (constructorId: string) => {
    history.push(`/constructor/${constructorId}`);
  }

  if (constructors === null || drivers === null) {
    return (
      <IonList>
        {[...Array(10)].map((item, index) =>
          <IonItem key={index}>
            <IonAvatar slot="start">
              &nbsp;
            </IonAvatar>
            <IonLabel>
              <IonSkeletonText animated style={{ height: '16px', width: '80px' }}/>
              <IonSkeletonText animated style={{ height: '16px', width: '120px' }}/>
            </IonLabel>
            <IonSkeletonText slot="end" animated style={{ height: '16px', width: '58px' }}/>
          </IonItem>
        )}
      </IonList>
    );
  }
  return (
    <IonList>
      {constructors.map(constructor =>
        <IonItem button onClick={() => _handleClick(constructor.Constructor.constructorId)} key={constructor.Constructor.constructorId}>
        <IonAvatar slot="start">
          <img src={`/assets/img/constructors/${constructor.Constructor.constructorId}.svg`} alt={constructor.Constructor.name}/>
        </IonAvatar>
        <IonLabel>
          <h3><strong className="ion-text-uppercase">{constructor.position} - {constructor.Constructor.name}</strong></h3>
          <p>
          {drivers && drivers
            .filter(driver => driver.Constructors[0].constructorId === constructor.Constructor.constructorId)
            .slice(0, 2)
            .map<React.ReactNode>(driver => (
              driver.Driver.familyName 
            ))
            .reduce((prev, curr) => [prev, ' / ', curr])
          }
          </p>
        </IonLabel>
        <IonBadge color="medium" slot="end">{constructor.points} PTS</IonBadge>
      </IonItem>
      )}
    </IonList>
  );
};

export default ConstructorStandings;
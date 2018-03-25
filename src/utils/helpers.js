import get from 'lodash/get';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';

export const dateToString = (date) => {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  return `${date.getFullYear()}-${(month[1] ? month : '0' + month[0])}-${(day[1] ? day : '0' + day[0])}`;
}

export const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1)

export const maxHazardousAsteroid = (asteroids) =>  
  reduce(asteroids, (aggregateMax, asteroid) => {
    if(aggregateMax.length < 2) {
      aggregateMax.push(asteroid);
      sortBy(aggregateMax, (astrd) => astrd.hazardous_asteroid); 
    } else {
      const index = aggregateMax.findIndex(({ hazardous_asteroid }) => hazardous_asteroid < asteroid.hazardous_asteroid);

      if (index === -1) {
        return aggregateMax;
      }
      
      aggregateMax[index] = asteroid;
      sortBy(aggregateMax, (astrd) => astrd.hazardous_asteroid);
    }
    return aggregateMax;
  }, [])

  const fields = {
    estimated_diameter: 'estimated_diameter',
    hazardous_asteroid: 'hazardous_asteroid',
    closest: 'closest',
    fastest: 'fastest'
  }
  
  const estimateDiameterPath = 'estimated_diameter.kilometers.estimated_diameter_max';
  const closestPath = 'close_approach_data[0].miss_distance.kilometers';
  const fastestPath = 'close_approach_data[0].relative_velocity.kilometers_per_hour';
  const hazardous_asteroid = 'is_potentially_hazardous_asteroid';
  
  export const getValuesObj = (value) => ({
    [fields.estimated_diameter]: get(value, estimateDiameterPath, 0),
    [fields.hazardous_asteroid]: get(value, hazardous_asteroid, 0),
    [fields.closest]: get(value, closestPath, 0),
    [fields.fastest]: get(value, fastestPath, 0)
  });
  
  export const computed = (currObj, nextObj) => {
    return {
      [fields.estimated_diameter]: Math.max(get(currObj, fields.estimated_diameter, 0), get(nextObj, fields.estimated_diameter, 0)),
      [fields.hazardous_asteroid]: get(currObj, fields.hazardous_asteroid, 0) + get(nextObj, fields.hazardous_asteroid, 0),
      [fields.closest]: Math.min(get(currObj, fields.closest, 0), get(nextObj, fields.closest, 0)),
      [fields.fastest]: Math.max(get(currObj, fields.fastest, 0), get(nextObj, fields.fastest, 0))
    }
  }
  
  export const upDay = (date, number) => {
    const newDay = new Date(date);
    newDay.setDate(newDay.getDate() + number);
    return newDay;
  }

  export const prepareObjects = (objects) => {
    return Object.keys(objects).reduce((result, key) => {
      const prepareDate = map(objects[key], getValuesObj);
      const computedObjects = reduce(prepareDate, (result, value) => computed(result, value));
      result.push({ date: new Date(key), ...computedObjects });
      return result;
    }, []);
  }; 
  
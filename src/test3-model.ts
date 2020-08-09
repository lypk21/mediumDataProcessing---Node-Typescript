import {TSMap} from "typescript-map";


export class MonthCount {
    //additional field to favor the AvgDaysToShip calculation
    public TotalDaysToShip: number = 0;
    public AvgDaysToShip: number = 0;
    public NumberOfOrders: number = 0;
    public Regions = new TSMap<string, RegionCount>();

    public addRegionCountByRegionName(regionName: string): RegionCount {
        if(!this.Regions.has(regionName)) {
            this.Regions.set(regionName,new RegionCount());
        }
        return this.Regions.get(regionName);
    }
    public addDiffDaysAndNumOfOrders(diffDays: number) {
        this.TotalDaysToShip = this.TotalDaysToShip + diffDays;
        this.NumberOfOrders ++;
        this.AvgDaysToShip = Math.round(this.TotalDaysToShip / this.NumberOfOrders);
    }
}

export class RegionCount {
    public TotalDaysToShip: number = 0;
    public AvgDaysToShip: number = 0;
    public NumberOfOrders: number = 0;
    public Countries = new TSMap<string, Count>();

    public addCountByCountryName(countryName: string, diffDays: number) {
        let count :Count;
        if(this.Countries.has(countryName)) {
            count = this.Countries.get(countryName);
        } else {
            count = new Count();
        }
        count.TotalDaysToShip += diffDays;
        count.NumberOfOrders ++;
        count.AvgDaysToShip = Math.round(count.TotalDaysToShip / count.NumberOfOrders);
        this.Countries.set(countryName,count);
    }

    public addDiffDaysAndNumOfOrders(diffDays: number) {
        this.TotalDaysToShip += diffDays;
        this.NumberOfOrders ++;
        this.AvgDaysToShip = Math.round(this.TotalDaysToShip / this.NumberOfOrders);
    }
}

export class Count {
    public TotalDaysToShip: number = 0;
    public AvgDaysToShip: number = 0;
    public NumberOfOrders: number = 0;
}





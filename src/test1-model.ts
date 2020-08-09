import {TSMap} from "typescript-map";

export class Region {
    public Regions = new TSMap<string, Country>();
    public ItemTypes = new TSMap<string, Summary>();

    /**
     * if not exist, create country instance, return the exist Country back.
     */
    public addCountryByRegionName(regionName: string): Country {
        if(!this.Regions.has(regionName)) {
            this.Regions.set(regionName, new Country());
        }
        return this.Regions.get(regionName);
    }

    /**
     * add itemtypes under regions
     */
    public addItemType(productName: string, summaryInput: Summary) {

        if(this.ItemTypes.has(productName)) {
            let summary = this.ItemTypes.get(productName);
            //keep two digit
            summary.Revenue = Math.floor(summary.Revenue + summaryInput.Revenue  * 100) / 100;
            summary.Cost = Math.floor(summary.Cost + summaryInput.Cost * 100) / 100;
            summary.Profit = Math.floor(summary.Profit + summaryInput.Profit * 100) / 100;
            this.ItemTypes.set(productName,summary);
        } else {
            //important, need to clone the object.
            this.ItemTypes.set(productName,Object.assign({}, summaryInput));
        }
    }
}

export class Country {
    public Total = new TSMap<string,number>();
    public countries = new TSMap<string, ItemType>();

    /**
     * return itemtypes, if not exist, create it
     */
    public addItemTypeByCountryName(countryName: string): ItemType {
        if(!this.countries.has(countryName)) {
            this.countries.set(countryName,new ItemType());
        }
        return this.countries.get(countryName);
    }

    public addSummaryToTotal(summaryInput: Summary) {
        this.Total.set('Revenue', this.Total.has('Revenue') ? Math.floor(this.Total.get('Revenue') + summaryInput.Revenue  * 100) / 100 : summaryInput.Revenue );
        this.Total.set('Cost', this.Total.has('Cost') ?  Math.floor(this.Total.get('Cost') + summaryInput.Cost  * 100)  / 100 : summaryInput.Cost);
        this.Total.set('Profit', this.Total.has('Profit') ?  Math.floor(this.Total.get('Profit') + summaryInput.Profit  * 100) /100 : summaryInput.Profit );
    }
}

export class ItemType {
    public Total = new TSMap<string,number>();
    public ItemTypes = new TSMap<string, Summary>();
    public addSummaryByProductName(productName: string, summaryInput: Summary) {
        let summary :Summary;
        if(this.ItemTypes.has(productName)) {
            summary = this.ItemTypes.get(productName);
            //keep two digit
            summary.Revenue = Math.floor(summary.Revenue + summaryInput.Revenue  * 100) / 100;
            summary.Cost = Math.floor(summary.Cost + summaryInput.Cost * 100) / 100;
            summary.Profit = Math.floor(summary.Profit + summaryInput.Profit * 100) / 100;
            this.ItemTypes.set(productName,summary);
        } else {
            //important, need to clone the object
            this.ItemTypes.set(productName,Object.assign({}, summaryInput));
        }
    }

    public addSummaryToTotal(summaryInput: Summary) {
        this.Total.set('Revenue', this.Total.has('Revenue') ? Math.floor(this.Total.get('Revenue') + summaryInput.Revenue  * 100) / 100 : summaryInput.Revenue );
        this.Total.set('Cost', this.Total.has('Cost') ?  Math.floor(this.Total.get('Cost') + summaryInput.Cost  * 100) / 100 : summaryInput.Cost);
        this.Total.set('Profit', this.Total.has('Profit') ?  Math.floor(this.Total.get('Profit') + summaryInput.Profit * 100) /100 : summaryInput.Profit );
    }
}

export class Summary {
    constructor(
        public Revenue: number,
        public Cost: number,
        public Profit: number
    ) {
    }
}



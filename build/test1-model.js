"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var Region = /** @class */ (function () {
    function Region() {
        this.Regions = new typescript_map_1.TSMap();
        this.ItemTypes = new typescript_map_1.TSMap();
    }
    /**
     * if not exist, create country instance, return the exist Country back.
     */
    Region.prototype.addCountryByRegionName = function (regionName) {
        if (!this.Regions.has(regionName)) {
            this.Regions.set(regionName, new Country());
        }
        return this.Regions.get(regionName);
    };
    /**
     * add itemtypes under regions
     */
    Region.prototype.addItemType = function (productName, summaryInput) {
        if (this.ItemTypes.has(productName)) {
            var summary = this.ItemTypes.get(productName);
            //keep two digit
            summary.Revenue = Math.floor(summary.Revenue + summaryInput.Revenue * 100) / 100;
            summary.Cost = Math.floor(summary.Cost + summaryInput.Cost * 100) / 100;
            summary.Profit = Math.floor(summary.Profit + summaryInput.Profit * 100) / 100;
            this.ItemTypes.set(productName, summary);
        }
        else {
            //important, need to clone the object.
            this.ItemTypes.set(productName, Object.assign({}, summaryInput));
        }
    };
    return Region;
}());
exports.Region = Region;
var Country = /** @class */ (function () {
    function Country() {
        this.Total = new typescript_map_1.TSMap();
        this.countries = new typescript_map_1.TSMap();
    }
    /**
     * return itemtypes, if not exist, create it
     */
    Country.prototype.addItemTypeByCountryName = function (countryName) {
        if (!this.countries.has(countryName)) {
            this.countries.set(countryName, new ItemType());
        }
        return this.countries.get(countryName);
    };
    Country.prototype.addSummaryToTotal = function (summaryInput) {
        this.Total.set('Revenue', this.Total.has('Revenue') ? Math.floor(this.Total.get('Revenue') + summaryInput.Revenue * 100) / 100 : summaryInput.Revenue);
        this.Total.set('Cost', this.Total.has('Cost') ? Math.floor(this.Total.get('Cost') + summaryInput.Cost * 100) / 100 : summaryInput.Cost);
        this.Total.set('Profit', this.Total.has('Profit') ? Math.floor(this.Total.get('Profit') + summaryInput.Profit * 100) / 100 : summaryInput.Profit);
    };
    return Country;
}());
exports.Country = Country;
var ItemType = /** @class */ (function () {
    function ItemType() {
        this.Total = new typescript_map_1.TSMap();
        this.ItemTypes = new typescript_map_1.TSMap();
    }
    ItemType.prototype.addSummaryByProductName = function (productName, summaryInput) {
        var summary;
        if (this.ItemTypes.has(productName)) {
            summary = this.ItemTypes.get(productName);
            //keep two digit
            summary.Revenue = Math.floor(summary.Revenue + summaryInput.Revenue * 100) / 100;
            summary.Cost = Math.floor(summary.Cost + summaryInput.Cost * 100) / 100;
            summary.Profit = Math.floor(summary.Profit + summaryInput.Profit * 100) / 100;
            this.ItemTypes.set(productName, summary);
        }
        else {
            //important, need to clone the object
            this.ItemTypes.set(productName, Object.assign({}, summaryInput));
        }
    };
    ItemType.prototype.addSummaryToTotal = function (summaryInput) {
        this.Total.set('Revenue', this.Total.has('Revenue') ? Math.floor(this.Total.get('Revenue') + summaryInput.Revenue * 100) / 100 : summaryInput.Revenue);
        this.Total.set('Cost', this.Total.has('Cost') ? Math.floor(this.Total.get('Cost') + summaryInput.Cost * 100) / 100 : summaryInput.Cost);
        this.Total.set('Profit', this.Total.has('Profit') ? Math.floor(this.Total.get('Profit') + summaryInput.Profit * 100) / 100 : summaryInput.Profit);
    };
    return ItemType;
}());
exports.ItemType = ItemType;
var Summary = /** @class */ (function () {
    function Summary(Revenue, Cost, Profit) {
        this.Revenue = Revenue;
        this.Cost = Cost;
        this.Profit = Profit;
    }
    return Summary;
}());
exports.Summary = Summary;
//# sourceMappingURL=test1-model.js.map
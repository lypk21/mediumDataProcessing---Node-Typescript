"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var MonthCount = /** @class */ (function () {
    function MonthCount() {
        //additional field to favor the AvgDaysToShip calculation
        this.TotalDaysToShip = 0;
        this.AvgDaysToShip = 0;
        this.NumberOfOrders = 0;
        this.Regions = new typescript_map_1.TSMap();
    }
    MonthCount.prototype.addRegionCountByRegionName = function (regionName) {
        if (!this.Regions.has(regionName)) {
            this.Regions.set(regionName, new RegionCount());
        }
        return this.Regions.get(regionName);
    };
    MonthCount.prototype.addDiffDaysAndNumOfOrders = function (diffDays) {
        this.TotalDaysToShip = this.TotalDaysToShip + diffDays;
        this.NumberOfOrders++;
        this.AvgDaysToShip = Math.round(this.TotalDaysToShip / this.NumberOfOrders);
    };
    return MonthCount;
}());
exports.MonthCount = MonthCount;
var RegionCount = /** @class */ (function () {
    function RegionCount() {
        this.TotalDaysToShip = 0;
        this.AvgDaysToShip = 0;
        this.NumberOfOrders = 0;
        this.Countries = new typescript_map_1.TSMap();
    }
    RegionCount.prototype.addCountByCountryName = function (countryName, diffDays) {
        var count;
        if (this.Countries.has(countryName)) {
            count = this.Countries.get(countryName);
        }
        else {
            count = new Count();
        }
        count.TotalDaysToShip += diffDays;
        count.NumberOfOrders++;
        count.AvgDaysToShip = Math.round(count.TotalDaysToShip / count.NumberOfOrders);
        this.Countries.set(countryName, count);
    };
    RegionCount.prototype.addDiffDaysAndNumOfOrders = function (diffDays) {
        this.TotalDaysToShip += diffDays;
        this.NumberOfOrders++;
        this.AvgDaysToShip = Math.round(this.TotalDaysToShip / this.NumberOfOrders);
    };
    return RegionCount;
}());
exports.RegionCount = RegionCount;
var Count = /** @class */ (function () {
    function Count() {
        this.TotalDaysToShip = 0;
        this.AvgDaysToShip = 0;
        this.NumberOfOrders = 0;
    }
    return Count;
}());
exports.Count = Count;
//# sourceMappingURL=test3-model.js.map
/*
Created By Erik Myers 2/12/18
CONFIG FILE FOR USE WITH SPARROW-Eastern U.S

THIS CONFIG REMOVES CATCHMENT AND AGGREGATE LABELS FROM THE CHARTOUTFIELS OBJECTS TO SHORTEN CHART AND DISPLAYED METRIC LABELS.
Also removes PNAME and replaces it with COMID and ST_COMID
*/

var appTitle = "Eastern United States 2002 Nutrient Loading";
var appVersion = "v0.9.0";

var serviceBaseURL = "https://sparrowtest.wim.usgs.gov/arcgis/rest/services/SparrowEast/SparrowEast/MapServer/"; //important! UPDATE rest service URL
var chartUnits = " (kg/yr.)";
var chartFeatureMax = 2500;  //chart will not be available if more than this many polygons are showing on map.

var groupResultsInitIndex = 1; //sets the default layer for the application.  In this case service layer 1 == HUC8.

var splitLayers = [5,6,7,13,14,15]; //important! UPDATE layer Ids of all state split layers

var mapCenter = [-77.64, 37.744];
//app.defaultMapCenter = [-87, 42];
defaultZoomLevel = 5;

borderThreshold = 10; //dynamic polygon border threshold.  When zoomed beyond this number borders appear
var dynamicBorderLayers = ["Catchment", "HUC12", "HUC8"]; //Aggregate layer choices placed in this array will have dynamic borders.  Each string MUST MATCH the text in the Group Results By Select to work.

var initQueryParams = ['ST', 'GP3', 'GP2', 'GP1' ]; //used to query for the AOI dropdown values on app init.

var groupResultsLabels = {
    a : "Catchment ID",
    b : "HUC12",
    c : "HUC8",
    d : "River Basin",
    e : "State"
}

//download locations
var phosphorusShapefileURL = 'https://sparrow.wim.usgs.gov/east-us/downloads/east_us_shapefiles_phosphorus.zip';
var nitrogenShapefileURL = 'https://sparrow.wim.usgs.gov/east-us/downloads/east_us_shapefiles_nitrogen.zip';
var phosCalibrationURL = 'https://sparrow.wim.usgs.gov/east-us/downloads/east_us_phosphorus_calibration_sites.zip';
var nitroCalibrationURL = 'https://sparrow.wim.usgs.gov/east-us/downloads/east_us_nitrogen_calibration_sites.zip';

var tableOutFields = [
    { field: "FID", name: "Unique Feature Id"},
    { field: "GRP1", name: "Main River Basin"},
    { field: "GRP2", name: "Tributary"},
    { field: "GRP_3_NA_1", name: "Join Field"},
    { field: "Area_g3", name: "HUC10 area (mi2)"}   
]

var stateTableOutFields = [
    { field: "FID", name: "Unique Feature Id"},
    { field: "ST_GP3_NAM", name: "HUC10/State (combination) ID"},
    { field: "Area_S3", name: "HUC10 area within the state and the  model area (mi2)"},   
    { field: "ST", name: "State"},
    { field: "GRP_1_NAM", name: "Independent Watershed name (in which HUC10 is nested)"},
    { field: "GP2", name: "HUC8 (in which HUC10 is nested)"},
    { field: "GRP_3_NAM", name: "HUC10"},
    { field: "ST_GP1_NAM", name: "State and Independent Watershed"},
    { field: "ST_GP2_NAM", name: "State amd HUC8"},
    { field: "ST_gp3_n_1", name: "Join Field"}

]

var aggregateDefinitions = {
    st : "State",
    gp1 : "River Basin",
    gp2 : "HUC8",
    gp3 : "HUC12",
    sg1 : "State_River Basin",
    sg2 : "State_HUC8",
    sg3 : "State_HUC12"
}

// key, value pairs come from PHOSPHORUS attribute definitions Excel file
var catchmentDefinitions = {
    comid : "Catchment ID",
    st_comid: "Catchment ID by State",
    pname : "Catchment Name",
    accl : "Accumulated load (kg)",
    incl : "Incremental load (kg)",
    accy : "Accumulated yield (kg/km2)",
    incy : "Incremental yield (kg/km2)",
    daccl : "Delivered accumulated load (kg)",
    daccy : "Delivered accumulated yield (kg/km2)",
    dincl : "Delivered incremental load  (kg)",
    dincy : "Delivered incremental yield (kg/km2)"
}

//Nitrogen same as Phosphorus in this model
var catchmentDefinitions_tn = {
    comid : "Catchment ID",
    st_comid: "Catchment ID by State",
    pname : "Catchment Name",
    accl : "Accumulated load (kg)",
    incl : "Incremental load (kg)",
    accy : "Accumulated yield (kg/km2)",
    incy : "Incremental yield (kg/km2)",
    daccl : "Delivered accumulated load (kg)",
    daccy : "Delivered accumulated yield (kg/km2)",
    dincl : "Delivered incremental load  (kg)",
    dincy : "Delivered incremental yield (kg/km2)"
}

var mappedDefinitions = {
    area : "Aggregated area (km2)",
    al : "Aggregated load (kg)",
    ay : "Aggregated yield (kg/km2)" ,
    dal : "Delivered aggregated load (kg)",
    day : "Delivered aggregated yield (kg/km2)",
    ap : "Percent of aggregated load",
    dap: "Percent of delivered aggregated load"
}

/***UPDATE IMPORTANT! complete with source data Excel key***/
var phosphorusSourceDefinitions = {
    s1 : "Wastewater",
    s2 : "Urban Land",
    s3 : "Manure",
    s4 : "Fertilizer Applied to Agricultural Land",
    s5 : "Phosphate - Mined Land",
    s6 : "Background - Weathering of Parent Rock"
}

/***UPDATE IMPORTANT! complete with source data Excel key***/
var nitrogenSourceDefinitions = {
    s1 : "Wastewater",
    s2 : "Urban Land",
    s3 : "Manure",
    s4 : "Fertilizer Applied to Agricultural Land",
    s5 : "Deposition from Power Plant Air Emissions",
    s6 : "Deposition from Other Industrial Air Emissions",
    s7 : "Deposition from Vehicle Emissions",
    s8 : "Deposition from Background"
}


/**get the HEX values below from project Google Doc and make sure:  
    1. each color corresponds with the order of SourceDefinitions objects above  
    2. there the number of hex colors matches the number of nutrient sources
**/
var phosColors = ['#BF0000', '#FFCCFF', '#663100', '#FFEC99', '#A2EB85', '#0070C0' ];     
var nitroColors = ['#BF0000', '#FFCCFF', '#663100', '#FFEC99', '#A2EB85', '#00a900', '#006800', '#0070C0' ];  


/***-----BEGIN PHOSPHORUS LAYER GROUPS --------***/
/* PHOSPHORUS CATCHMENTS */
    
/*DOCUMENTATION NOTES: each 'field below should correspond to a "Mapped Attribute" in the cats_tp_attribute_Definitions.xlsx file.  These are the attributes that will be displayed on the map. */
var Catchments = [    
    {
        field: "ACCL", 
        name: catchmentDefinitions.accl, 
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid },
            { attribute: "ACCL_S1", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ACCL_S2", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ACCL_S3", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ACCL_S4", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ACCL_S5", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ACCL_S6", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "INCL", 
        name: catchmentDefinitions.incl, 
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid }, 
            { attribute: "INCL_S1", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "INCL_S2", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "INCL_S3", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "INCL_S4", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "INCL_S5", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "INCL_S6", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "ACCY", 
        name: catchmentDefinitions.accy,
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid }, 
            { attribute: "ACCY_S1", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ACCY_S2", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ACCY_S3", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ACCY_S4", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ACCY_S5", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ACCY_S6", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "INCY", 
        name: catchmentDefinitions.incy,
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid }, 
            { attribute: "INCY_S1", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "INCY_S2", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "INCY_S3", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "INCY_S4", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "INCY_S5", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "INCY_S6", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DACCL", 
        name: catchmentDefinitions.daccl,
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid }, 
            { attribute: "DACCL_S1", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DACCL_S2", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DACCL_S3", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DACCL_S4", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DACCL_S5", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DACCL_S6", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DACCY", 
        name: catchmentDefinitions.daccy,
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid }, 
            { attribute: "DACCY_S1", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DACCY_S2", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DACCY_S3", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DACCY_S4", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DACCY_S5", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DACCY_S6", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DINCL", 
        name: catchmentDefinitions.dincl, 
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid },
            { attribute: "DINCL_S1", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DINCL_S2", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DINCL_S3", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DINCL_S4", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DINCL_S5", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DINCL_S6", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DINCY", 
        name: catchmentDefinitions.dincy,
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid },
            { attribute: "DINCY_S1", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DINCY_S2", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DINCY_S3", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DINCY_S4", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DINCY_S5", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DINCY_S6", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }

]

//HUC8 Metric choices, service Id 1
var Group3 = [    
    {
        field: "GP3_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP3_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "GP3_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP3_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

//HUC8 Metric choices, Service Id 1
var Group2 = [
    {
        field: "GP2_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP2_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP2_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP2_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP2_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP2_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP2_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP2_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP2_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP2_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP2_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP2_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "GP2_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP2_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP2_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP2_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP2_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP2_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP2_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP2_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP2_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP2_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP2_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP2_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

var Group1 = [
    {
        field: "GP1_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP1_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP1_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP1_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP1_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP1_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP1_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP1_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP1_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP1_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP1_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP1_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "GP1_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP1_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP1_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP1_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP1_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP1_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP1_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP1_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP1_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP1_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP1_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP1_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

var ST = [
    {
        field: "ST_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ST_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ST_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ST_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ST_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ST_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "ST_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ST_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ST_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ST_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ST_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ST_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "ST_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ST_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ST_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ST_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ST_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ST_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "ST_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ST_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ST_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ST_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ST_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ST_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

var Catchments_st = [
    {
        field: "ACCL", 
        name: catchmentDefinitions.accl, 
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid },
            { attribute: "ACCL_S1", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ACCL_S2", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ACCL_S3", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ACCL_S4", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ACCL_S5", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ACCL_S6", label: catchmentDefinitions.accl + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "INCL", 
        name: catchmentDefinitions.incl, 
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid }, 
            { attribute: "INCL_S1", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "INCL_S2", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "INCL_S3", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "INCL_S4", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "INCL_S5", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "INCL_S6", label: catchmentDefinitions.incl + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "ACCY", 
        name: catchmentDefinitions.accy,
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid }, 
            { attribute: "ACCY_S1", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "ACCY_S2", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "ACCY_S3", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "ACCY_S4", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "ACCY_S5", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "ACCY_S6", label: catchmentDefinitions.accy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "INCY", 
        name: catchmentDefinitions.incy,
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid }, 
            { attribute: "INCY_S1", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "INCY_S2", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "INCY_S3", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "INCY_S4", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "INCY_S5", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "INCY_S6", label: catchmentDefinitions.incy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DACCL", 
        name: catchmentDefinitions.daccl,
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid }, 
            { attribute: "DACCL_S1", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DACCL_S2", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DACCL_S3", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DACCL_S4", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DACCL_S5", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DACCL_S6", label: catchmentDefinitions.daccl + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DACCY", 
        name: catchmentDefinitions.daccy,
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid }, 
            { attribute: "DACCY_S1", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DACCY_S2", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DACCY_S3", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DACCY_S4", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DACCY_S5", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DACCY_S6", label: catchmentDefinitions.daccy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DINCL", 
        name: catchmentDefinitions.dincl, 
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid },
            { attribute: "DINCL_S1", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DINCL_S2", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DINCL_S3", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DINCL_S4", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DINCL_S5", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DINCL_S6", label: catchmentDefinitions.dincl + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "DINCY", 
        name: catchmentDefinitions.dincy,
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid },
            { attribute: "DINCY_S1", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "DINCY_S2", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "DINCY_S3", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "DINCY_S4", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "DINCY_S5", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "DINCY_S6", label: catchmentDefinitions.dincy + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }

]

//HUC8 Metric choices, service Id 1
var Group3 = [    
    {
        field: "GP3_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP3_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "GP3_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "GP3_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "GP3_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "GP3_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "GP3_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "GP3_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "GP3_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

var Group3_st = [
    {
        field: "SG3_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG3_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG3_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG3_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG3_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG3_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "SG3_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG3_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG3_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG3_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG3_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG3_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "SG3_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG3_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG3_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG3_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG3_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG3_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "SG3_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG3_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG3_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG3_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG3_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG3_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

var Group2_st = [
    {
        field: "SG2_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG2_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG2_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG2_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG2_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG2_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "SG2_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG2_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG2_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG2_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG2_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG2_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "SG2_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG2_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG2_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG2_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG2_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG2_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "SG2_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG2_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG2_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG2_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG2_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG2_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]

var Group1_st = [
    {
        field: "SG1_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_AL_S1", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG1_AL_S2", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG1_AL_S3", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG1_AL_S4", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG1_AL_S5", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG1_AL_S6", label: mappedDefinitions.al + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "SG1_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_DAL_S1", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG1_DAL_S2", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG1_DAL_S3", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG1_DAL_S4", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG1_DAL_S5", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG1_DAL_S6", label: mappedDefinitions.dal + ' ' + phosphorusSourceDefinitions.s6}
        ] 
    },
    {
        field: "SG1_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_AY_S1", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG1_AY_S2", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG1_AY_S3", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG1_AY_S4", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG1_AY_S5", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG1_AY_S6", label: mappedDefinitions.ay + ' ' + phosphorusSourceDefinitions.s6}
        ]
    },
    {
        field: "SG1_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_DAY_S1", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s1},
            { attribute: "SG1_DAY_S2", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s2},
            { attribute: "SG1_DAY_S3", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s3},
            { attribute: "SG1_DAY_S4", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s4},
            { attribute: "SG1_DAY_S5", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s5},
            { attribute: "SG1_DAY_S6", label: mappedDefinitions.day + ' ' + phosphorusSourceDefinitions.s6}
        ]
    }
]
////END PHOSPHORUS LAYER GROUPS______________________________________________________________________________________________________________________________

////BEGIN NITROGEN LAYER GROUPS______________________________________________________________________________________________________________________________
//Catchments NITRO
var Catchments_tn = [
    {
        field: "ACCL", 
        name: catchmentDefinitions_tn.accl, 
        chartOutfields: [
            { attribute: "COMID",  label: catchmentDefinitions.comid },
            { attribute: "ACCL_S1", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ACCL_S2", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ACCL_S3", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ACCL_S4", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ACCL_S5", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ACCL_S6", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ACCL_S7", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ACCL_S8", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "INCL", 
        name: catchmentDefinitions_tn.incl, 
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid }, 
            { attribute: "INCL_S1", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "INCL_S2", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "INCL_S3", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "INCL_S4", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "INCL_S5", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "INCL_S6", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "INCL_S7", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "INCL_S8", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "ACCY", 
        name: catchmentDefinitions_tn.accy,
        chartOutfields: [
            { attribute: "COMID",  label: catchmentDefinitions.comid },
            { attribute: "ACCY_S1", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ACCY_S2", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ACCY_S3", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ACCY_S4", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ACCY_S5", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ACCY_S6", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ACCY_S7", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ACCY_S8", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "INCY", 
        name: catchmentDefinitions_tn.incy,
        chartOutfields: [
            { attribute: "COMID",  label: catchmentDefinitions.comid },
            { attribute: "INCY_S1", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "INCY_S2", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "INCY_S3", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "INCY_S4", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "INCY_S5", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "INCY_S6", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "INCY_S7", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "INCY_S8", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DACCL", 
        name: catchmentDefinitions_tn.daccl,
        chartOutfields: [
            { attribute: "COMID",  label: catchmentDefinitions.comid },
            { attribute: "DACCL_S1", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DACCL_S2", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DACCL_S3", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DACCL_S4", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DACCL_S5", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DACCL_S6", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DACCL_S7", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DACCL_S8", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DACCY", 
        name: catchmentDefinitions_tn.daccy,
        chartOutfields: [
            { attribute: "COMID",  label: catchmentDefinitions.comid },
            { attribute: "DACCY_S1", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DACCY_S2", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DACCY_S3", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DACCY_S4", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DACCY_S5", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DACCY_S6", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DACCY_S7", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DACCY_S8", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DINCL", 
        name: catchmentDefinitions_tn.dincl, 
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid },
            { attribute: "DINCL_S1", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DINCL_S2", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DINCL_S3", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DINCL_S4", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DINCL_S5", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DINCL_S6", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DINCL_S7", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DINCL_S8", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DINCY", 
        name: catchmentDefinitions_tn.dincy,
        chartOutfields: [
            { attribute: "COMID", label: catchmentDefinitions.comid },
            { attribute: "DINCY_S1", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DINCY_S2", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DINCY_S3", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DINCY_S4", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DINCY_S5", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DINCY_S6", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DINCY_S7", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DINCY_S8", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

var Group3_tn = [
    {
        field: "GP3_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP3_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP3_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP3_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP3_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP3_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP3_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP3_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "GP3_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP3_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP3_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP3_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP3_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP3_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP3_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP3_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "GP3_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP3_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP3_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP3_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP3_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP3_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP3_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP3_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "GP3_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP3", label: aggregateDefinitions.gp3 }, 
            { attribute: "GP3_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP3_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP3_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP3_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP3_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP3_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP3_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP3_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

//HUC8 Metric choices, Service Id 1
var Group2_tn = [
    {
        field: "GP2_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP2_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP2_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP2_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP2_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP2_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP2_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP2_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "GP2_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP2_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP2_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP2_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP2_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP2_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP2_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP2_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "GP2_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP2_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP2_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP2_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP2_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP2_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP2_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP2_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "GP2_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP2", label: aggregateDefinitions.gp2 }, 
            { attribute: "GP2_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP2_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP2_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP2_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP2_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP2_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP2_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP2_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

//independent watershed Metric choices, Service ID 2
var Group1_tn = [
    {
        field: "GP1_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP1_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP1_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP1_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP1_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP1_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP1_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP1_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}       
        ]
    },
    {
        field: "GP1_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP1_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP1_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP1_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP1_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP1_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP1_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP1_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}       
        ] 
    },
    {
        field: "GP1_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP1_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP1_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP1_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP1_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP1_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP1_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP1_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "GP1_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "GP1", label: aggregateDefinitions.gp1 }, 
            { attribute: "GP1_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "GP1_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "GP1_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "GP1_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "GP1_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "GP1_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "GP1_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "GP1_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

var ST_tn = [
    {
        field: "ST_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ST_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ST_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ST_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ST_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ST_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ST_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ST_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "ST_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ST_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ST_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ST_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ST_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},        
            { attribute: "ST_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ST_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ST_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "ST_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ST_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ST_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ST_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ST_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ST_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ST_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ST_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "ST_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "ST", label: aggregateDefinitions.st }, 
            { attribute: "ST_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ST_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ST_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ST_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ST_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ST_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ST_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ST_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}        
        
        ]
    }
]

var Catchments_st_tn = [
    {
        field: "ACCL", 
        name: catchmentDefinitions_tn.accl, 
        chartOutfields: [
            { attribute: "ST_COMID",  label: catchmentDefinitions.st_comid },
            { attribute: "ACCL_S1", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ACCL_S2", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ACCL_S3", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ACCL_S4", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ACCL_S5", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ACCL_S6", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ACCL_S7", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ACCL_S8", label: catchmentDefinitions_tn.accl + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "INCL", 
        name: catchmentDefinitions_tn.incl, 
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid }, 
            { attribute: "INCL_S1", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "INCL_S2", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "INCL_S3", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "INCL_S4", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "INCL_S5", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "INCL_S6", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "INCL_S7", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "INCL_S8", label: catchmentDefinitions_tn.incl + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "ACCY", 
        name: catchmentDefinitions_tn.accy,
        chartOutfields: [
            { attribute: "ST_COMID",  label: catchmentDefinitions.st_comid },
            { attribute: "ACCY_S1", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "ACCY_S2", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "ACCY_S3", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "ACCY_S4", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "ACCY_S5", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "ACCY_S6", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "ACCY_S7", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "ACCY_S8", label: catchmentDefinitions_tn.accy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "INCY", 
        name: catchmentDefinitions_tn.incy,
        chartOutfields: [
            { attribute: "ST_COMID",  label: catchmentDefinitions.st_comid },
            { attribute: "INCY_S1", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "INCY_S2", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "INCY_S3", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "INCY_S4", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "INCY_S5", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "INCY_S6", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "INCY_S7", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "INCY_S8", label: catchmentDefinitions_tn.incy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DACCL", 
        name: catchmentDefinitions_tn.daccl,
        chartOutfields: [
            { attribute: "ST_COMID",  label: catchmentDefinitions.st_comid },
            { attribute: "DACCL_S1", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DACCL_S2", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DACCL_S3", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DACCL_S4", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DACCL_S5", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DACCL_S6", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DACCL_S7", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DACCL_S8", label: catchmentDefinitions_tn.daccl + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DACCY", 
        name: catchmentDefinitions_tn.daccy,
        chartOutfields: [
            { attribute: "ST_COMID",  label: catchmentDefinitions.st_comid },
            { attribute: "DACCY_S1", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DACCY_S2", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DACCY_S3", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DACCY_S4", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DACCY_S5", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DACCY_S6", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DACCY_S7", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DACCY_S8", label: catchmentDefinitions_tn.daccy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DINCL", 
        name: catchmentDefinitions_tn.dincl, 
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid },
            { attribute: "DINCL_S1", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DINCL_S2", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DINCL_S3", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DINCL_S4", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DINCL_S5", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DINCL_S6", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DINCL_S7", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DINCL_S8", label: catchmentDefinitions_tn.dincl + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "DINCY", 
        name: catchmentDefinitions_tn.dincy,
        chartOutfields: [
            { attribute: "ST_COMID", label: catchmentDefinitions.st_comid },
            { attribute: "DINCY_S1", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "DINCY_S2", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "DINCY_S3", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "DINCY_S4", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "DINCY_S5", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "DINCY_S6", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "DINCY_S7", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "DINCY_S8", label: catchmentDefinitions_tn.dincy + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

var Group3_st_tn = [
    {
        field: "SG3_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG3_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG3_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG3_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG3_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "SG3_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG3_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG3_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "SG3_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG3_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG3_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG3_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG3_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "SG3_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG3_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG3_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "SG3_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG3_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG3_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG3_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG3_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "SG3_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG3_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG3_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "SG3_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "SG3", label: aggregateDefinitions.sg3 }, 
            { attribute: "SG3_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG3_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG3_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG3_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG3_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "SG3_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG3_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG3_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

var Group2_st_tn = [
   {
        field: "SG2_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG2_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG2_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG2_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG2_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "SG2_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG2_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG2_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "SG2_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG2_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG2_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG2_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG2_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},        
            { attribute: "SG2_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG2_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG2_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "SG2_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG2_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG2_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG2_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG2_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},        
            { attribute: "SG2_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG2_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG2_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "SG2_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "SG2", label: aggregateDefinitions.sg2 }, 
            { attribute: "SG2_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG2_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG2_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG2_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG2_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5},        
            { attribute: "SG2_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG2_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG2_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]

var Group1_st_tn = [
    {
        field: "SG1_AL", 
        name: mappedDefinitions.al, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_AL_S1", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG1_AL_S2", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG1_AL_S3", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG1_AL_S4", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG1_AL_S5", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s5},        
            { attribute: "SG1_AL_S6", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG1_AL_S7", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG1_AL_S8", label: mappedDefinitions.al + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "SG1_DAL", 
        name: mappedDefinitions.dal, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_DAL_S1", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG1_DAL_S2", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG1_DAL_S3", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG1_DAL_S4", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG1_DAL_S5", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s5},        
            { attribute: "SG1_DAL_S6", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG1_DAL_S7", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG1_DAL_S8", label: mappedDefinitions.dal + ' ' + nitrogenSourceDefinitions.s8}
        ] 
    },
    {
        field: "SG1_AY", 
        name: mappedDefinitions.ay, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_AY_S1", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG1_AY_S2", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG1_AY_S3", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG1_AY_S4", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG1_AY_S5", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s5},
            { attribute: "SG1_AY_S6", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG1_AY_S7", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG1_AY_S8", label: mappedDefinitions.ay + ' ' + nitrogenSourceDefinitions.s8}
        ]
    },
    {
        field: "SG1_DAY", 
        name: mappedDefinitions.day, 
        chartOutfields: [
            { attribute: "SG1", label: aggregateDefinitions.sg1 }, 
            { attribute: "SG1_DAY_S1", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s1},
            { attribute: "SG1_DAY_S2", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s2},
            { attribute: "SG1_DAY_S3", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s3},
            { attribute: "SG1_DAY_S4", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s4},
            { attribute: "SG1_DAY_S5", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s5}, 
            { attribute: "SG1_DAY_S6", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s6},
            { attribute: "SG1_DAY_S7", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s7},
            { attribute: "SG1_DAY_S8", label: mappedDefinitions.day + ' ' + nitrogenSourceDefinitions.s8}
        ]
    }
]
////END NITROGEN LAYER GROUPS______________________________________________________________________________________________________________________________


 
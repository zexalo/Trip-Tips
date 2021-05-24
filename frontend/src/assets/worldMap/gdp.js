function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var svgMapData = {
    data: {
        color: {
            thresholdMax: 40,
            thresholdMin: 10
        }
    },
    applyData: 'color',
    values: {
        AF: {link: 'https://pt.wikipedia.org/wiki/AF', color: getRandomInt(50)},
        AL: {link: 'https://pt.wikipedia.org/wiki/AL', color: getRandomInt(50)},
        DZ: {link: 'https://pt.wikipedia.org/wiki/DZ', color: getRandomInt(50)},
        AO: {link: 'https://pt.wikipedia.org/wiki/AO', color: getRandomInt(50)},
        AG: {link: 'https://pt.wikipedia.org/wiki/AG', color: getRandomInt(50)},
        AR: {link: 'https://pt.wikipedia.org/wiki/AR', color: getRandomInt(50)},
        AM: {link: 'https://pt.wikipedia.org/wiki/AM', color: getRandomInt(50)},
        AU: {link: 'https://pt.wikipedia.org/wiki/AU', color: getRandomInt(50)},
        AT: {link: 'https://pt.wikipedia.org/wiki/AT', color: getRandomInt(50)},
        AZ: {link: 'https://pt.wikipedia.org/wiki/AZ', color: getRandomInt(50)},
        BS: {link: 'https://pt.wikipedia.org/wiki/BS', color: getRandomInt(50)},
        BH: {link: 'https://pt.wikipedia.org/wiki/BH', color: getRandomInt(50)},
        BD: {link: 'https://pt.wikipedia.org/wiki/BD', color: getRandomInt(50)},
        BB: {link: 'https://pt.wikipedia.org/wiki/BB', color: getRandomInt(50)},
        BY: {link: 'https://pt.wikipedia.org/wiki/BY', color: getRandomInt(50)},
        BE: {link: 'https://pt.wikipedia.org/wiki/BE', color: getRandomInt(50)},
        BZ: {link: 'https://pt.wikipedia.org/wiki/BZ', color: getRandomInt(50)},
        BJ: {link: 'https://pt.wikipedia.org/wiki/BJ', color: getRandomInt(50)},
        BT: {link: 'https://pt.wikipedia.org/wiki/BT', color: getRandomInt(50)},
        BO: {link: 'https://pt.wikipedia.org/wiki/BO', color: getRandomInt(50)},
        BA: {link: 'https://pt.wikipedia.org/wiki/BA', color: getRandomInt(50)},
        BW: {link: 'https://pt.wikipedia.org/wiki/BW', color: getRandomInt(50)},
        BR: {link: 'https://pt.wikipedia.org/wiki/BR', color: getRandomInt(50)},
        BN: {link: 'https://pt.wikipedia.org/wiki/BN', color: getRandomInt(50)},
        BG: {link: 'https://pt.wikipedia.org/wiki/BG', color: getRandomInt(50)},
        BF: {link: 'https://pt.wikipedia.org/wiki/BF', color: getRandomInt(50)},
        BI: {link: 'https://pt.wikipedia.org/wiki/BI', color: getRandomInt(50)},
        KH: {link: 'https://pt.wikipedia.org/wiki/KH', color: getRandomInt(50)},
        CM: {link: 'https://pt.wikipedia.org/wiki/CM', color: getRandomInt(50)},
        CA: {link: 'https://pt.wikipedia.org/wiki/CA', color: getRandomInt(50)},
        XK: {link: 'https://pt.wikipedia.org/wiki/XK', color: getRandomInt(50)},
        CV: {link: 'https://pt.wikipedia.org/wiki/CV', color: getRandomInt(50)},
        CF: {link: 'https://pt.wikipedia.org/wiki/CF', color: getRandomInt(50)},
        TD: {link: 'https://pt.wikipedia.org/wiki/TD', color: getRandomInt(50)},
        CL: {link: 'https://pt.wikipedia.org/wiki/CL', color: getRandomInt(50)},
        CN: {link: 'https://pt.wikipedia.org/wiki/CN', color: getRandomInt(50)},
        CO: {link: 'https://pt.wikipedia.org/wiki/CO', color: getRandomInt(50)},
        KM: {link: 'https://pt.wikipedia.org/wiki/KM', color: getRandomInt(50)},
        CG: {link: 'https://pt.wikipedia.org/wiki/CG', color: getRandomInt(50)},
        CR: {link: 'https://pt.wikipedia.org/wiki/CR', color: getRandomInt(50)},
        HR: {link: 'https://pt.wikipedia.org/wiki/HR', color: getRandomInt(50)},
        CY: {link: 'https://pt.wikipedia.org/wiki/CY', color: getRandomInt(50)},
        CZ: {link: 'https://pt.wikipedia.org/wiki/CZ', color: getRandomInt(50)},
        CD: {link: 'https://pt.wikipedia.org/wiki/CD', color: getRandomInt(50)},
        DK: {link: 'https://pt.wikipedia.org/wiki/DK', color: getRandomInt(50)},
        DJ: {link: 'https://pt.wikipedia.org/wiki/DJ', color: getRandomInt(50)},
        DM: {link: 'https://pt.wikipedia.org/wiki/DM', color: getRandomInt(50)},
        DO: {link: 'https://pt.wikipedia.org/wiki/DO', color: getRandomInt(50)},
        EC: {link: 'https://pt.wikipedia.org/wiki/EC', color: getRandomInt(50)},
        EG: {link: 'https://pt.wikipedia.org/wiki/EG', color: getRandomInt(50)},
        SV: {link: 'https://pt.wikipedia.org/wiki/SV', color: getRandomInt(50)},
        GQ: {link: 'https://pt.wikipedia.org/wiki/GQ', color: getRandomInt(50)},
        ER: {link: 'https://pt.wikipedia.org/wiki/ER', color: getRandomInt(50)},
        EE: {link: 'https://pt.wikipedia.org/wiki/EE', color: getRandomInt(50)},
        ET: {link: 'https://pt.wikipedia.org/wiki/ET', color: getRandomInt(50)},
        FM: {link: 'https://pt.wikipedia.org/wiki/FM', color: getRandomInt(50)},
        FJ: {link: 'https://pt.wikipedia.org/wiki/FJ', color: getRandomInt(50)},
        FI: {link: 'https://pt.wikipedia.org/wiki/FI', color: getRandomInt(50)},
        FR: {link: 'https://pt.wikipedia.org/wiki/FR', color: getRandomInt(50)},
        GA: {link: 'https://pt.wikipedia.org/wiki/GA', color: getRandomInt(50)},
        GM: {link: 'https://pt.wikipedia.org/wiki/GM', color: getRandomInt(50)},
        GE: {link: 'https://pt.wikipedia.org/wiki/GE', color: getRandomInt(50)},
        DE: {link: 'https://pt.wikipedia.org/wiki/DE', color: getRandomInt(50)},
        GH: {link: 'https://pt.wikipedia.org/wiki/GH', color: getRandomInt(50)},
        GL: {link: 'https://pt.wikipedia.org/wiki/GL', color: getRandomInt(50)},
        GR: {link: 'https://pt.wikipedia.org/wiki/GR', color: getRandomInt(50)},
        GD: {link: 'https://pt.wikipedia.org/wiki/GD', color: getRandomInt(50)},
        GT: {link: 'https://pt.wikipedia.org/wiki/GT', color: getRandomInt(50)},
        GN: {link: 'https://pt.wikipedia.org/wiki/GN', color: getRandomInt(50)},
        GW: {link: 'https://pt.wikipedia.org/wiki/GW', color: getRandomInt(50)},
        GY: {link: 'https://pt.wikipedia.org/wiki/GY', color: getRandomInt(50)},
        HT: {link: 'https://pt.wikipedia.org/wiki/HT', color: getRandomInt(50)},
        HN: {link: 'https://pt.wikipedia.org/wiki/HN', color: getRandomInt(50)},
        HK: {link: 'https://pt.wikipedia.org/wiki/HK', color: getRandomInt(50)},
        HU: {link: 'https://pt.wikipedia.org/wiki/HU', color: getRandomInt(50)},
        IS: {link: 'https://pt.wikipedia.org/wiki/IS', color: getRandomInt(50)},
        IN: {link: 'https://pt.wikipedia.org/wiki/IN', color: getRandomInt(50)},
        ID: {link: 'https://pt.wikipedia.org/wiki/ID', color: getRandomInt(50)},
        IR: {link: 'https://pt.wikipedia.org/wiki/IR', color: getRandomInt(50)},
        IQ: {link: 'https://pt.wikipedia.org/wiki/IQ', color: getRandomInt(50)},
        IE: {link: 'https://pt.wikipedia.org/wiki/IE', color: getRandomInt(50)},
        IL: {link: 'https://pt.wikipedia.org/wiki/IL', color: getRandomInt(50)},
        IT: {link: 'https://pt.wikipedia.org/wiki/IT', color: getRandomInt(50)},
        CI: {link: 'https://pt.wikipedia.org/wiki/CI', color: getRandomInt(50)},
        JM: {link: 'https://pt.wikipedia.org/wiki/JM', color: getRandomInt(50)},
        JP: {link: 'https://pt.wikipedia.org/wiki/JP', color: getRandomInt(50)},
        JO: {link: 'https://pt.wikipedia.org/wiki/JO', color: getRandomInt(50)},
        KZ: {link: 'https://pt.wikipedia.org/wiki/KZ', color: getRandomInt(50)},
        KE: {link: 'https://pt.wikipedia.org/wiki/KE', color: getRandomInt(50)},
        KI: {link: 'https://pt.wikipedia.org/wiki/KI', color: getRandomInt(50)},
        KW: {link: 'https://pt.wikipedia.org/wiki/KW', color: getRandomInt(50)},
        KG: {link: 'https://pt.wikipedia.org/wiki/KG', color: getRandomInt(50)},
        LA: {link: 'https://pt.wikipedia.org/wiki/LA', color: getRandomInt(50)},
        LV: {link: 'https://pt.wikipedia.org/wiki/LV', color: getRandomInt(50)},
        LB: {link: 'https://pt.wikipedia.org/wiki/LB', color: getRandomInt(50)},
        LS: {link: 'https://pt.wikipedia.org/wiki/LS', color: getRandomInt(50)},
        LR: {link: 'https://pt.wikipedia.org/wiki/LR', color: getRandomInt(50)},
        LY: {link: 'https://pt.wikipedia.org/wiki/LY', color: getRandomInt(50)},
        LT: {link: 'https://pt.wikipedia.org/wiki/LT', color: getRandomInt(50)},
        LU: {link: 'https://pt.wikipedia.org/wiki/LU', color: getRandomInt(50)},
        MO: {link: 'https://pt.wikipedia.org/wiki/MO', color: getRandomInt(50)},
        MK: {link: 'https://pt.wikipedia.org/wiki/MK', color: getRandomInt(50)},
        MG: {link: 'https://pt.wikipedia.org/wiki/MG', color: getRandomInt(50)},
        MW: {link: 'https://pt.wikipedia.org/wiki/MW', color: getRandomInt(50)},
        MY: {link: 'https://pt.wikipedia.org/wiki/MY', color: getRandomInt(50)},
        MV: {link: 'https://pt.wikipedia.org/wiki/MV', color: getRandomInt(50)},
        ML: {link: 'https://pt.wikipedia.org/wiki/ML', color: getRandomInt(50)},
        MT: {link: 'https://pt.wikipedia.org/wiki/MT', color: getRandomInt(50)},
        MH: {link: 'https://pt.wikipedia.org/wiki/MH', color: getRandomInt(50)},
        MR: {link: 'https://pt.wikipedia.org/wiki/MR', color: getRandomInt(50)},
        MU: {link: 'https://pt.wikipedia.org/wiki/MU', color: getRandomInt(50)},
        MX: {link: 'https://pt.wikipedia.org/wiki/MX', color: getRandomInt(50)},
        MD: {link: 'https://pt.wikipedia.org/wiki/MD', color: getRandomInt(50)},
        MN: {link: 'https://pt.wikipedia.org/wiki/MN', color: getRandomInt(50)},
        ME: {link: 'https://pt.wikipedia.org/wiki/ME', color: getRandomInt(50)},
        MA: {link: 'https://pt.wikipedia.org/wiki/MA', color: getRandomInt(50)},
        MZ: {link: 'https://pt.wikipedia.org/wiki/MZ', color: getRandomInt(50)},
        MM: {link: 'https://pt.wikipedia.org/wiki/MM', color: getRandomInt(50)},
        NA: {link: 'https://pt.wikipedia.org/wiki/NA', color: getRandomInt(50)},
        NR: {link: 'https://pt.wikipedia.org/wiki/NR', color: getRandomInt(50)},
        NP: {link: 'https://pt.wikipedia.org/wiki/NP', color: getRandomInt(50)},
        NL: {link: 'https://pt.wikipedia.org/wiki/NL', color: getRandomInt(50)},
        NZ: {link: 'https://pt.wikipedia.org/wiki/NZ', color: getRandomInt(50)},
        NI: {link: 'https://pt.wikipedia.org/wiki/NI', color: getRandomInt(50)},
        NE: {link: 'https://pt.wikipedia.org/wiki/NE', color: getRandomInt(50)},
        NG: {link: 'https://pt.wikipedia.org/wiki/NG', color: getRandomInt(50)},
        NO: {link: 'https://pt.wikipedia.org/wiki/NO', color: getRandomInt(50)},
        OM: {link: 'https://pt.wikipedia.org/wiki/OM', color: getRandomInt(50)},
        PK: {link: 'https://pt.wikipedia.org/wiki/PK', color: getRandomInt(50)},
        PW: {link: 'https://pt.wikipedia.org/wiki/PW', color: getRandomInt(50)},
        PA: {link: 'https://pt.wikipedia.org/wiki/PA', color: getRandomInt(50)},
        PG: {link: 'https://pt.wikipedia.org/wiki/PG', color: getRandomInt(50)},
        PY: {link: 'https://pt.wikipedia.org/wiki/PY', color: getRandomInt(50)},
        PE: {link: 'https://pt.wikipedia.org/wiki/PE', color: getRandomInt(50)},
        PH: {link: 'https://pt.wikipedia.org/wiki/PH', color: getRandomInt(50)},
        PL: {link: 'https://pt.wikipedia.org/wiki/PL', color: getRandomInt(50)},
        PT: {link: 'https://pt.wikipedia.org/wiki/PT', color: getRandomInt(50)},
        PR: {link: 'https://pt.wikipedia.org/wiki/PR', color: getRandomInt(50)},
        QA: {link: 'https://pt.wikipedia.org/wiki/QA', color: getRandomInt(50)},
        RO: {link: 'https://pt.wikipedia.org/wiki/RO', color: getRandomInt(50)},
        RU: {link: 'https://pt.wikipedia.org/wiki/RU', color: getRandomInt(50)},
        RW: {link: 'https://pt.wikipedia.org/wiki/RW', color: getRandomInt(50)},
        KN: {link: 'https://pt.wikipedia.org/wiki/KN', color: getRandomInt(50)},
        LC: {link: 'https://pt.wikipedia.org/wiki/LC', color: getRandomInt(50)},
        VC: {link: 'https://pt.wikipedia.org/wiki/VC', color: getRandomInt(50)},
        WS: {link: 'https://pt.wikipedia.org/wiki/WS', color: getRandomInt(50)},
        SM: {link: 'https://pt.wikipedia.org/wiki/SM', color: getRandomInt(50)},
        ST: {link: 'https://pt.wikipedia.org/wiki/ST', color: getRandomInt(50)},
        SA: {link: 'https://pt.wikipedia.org/wiki/SA', color: getRandomInt(50)},
        SN: {link: 'https://pt.wikipedia.org/wiki/SN', color: getRandomInt(50)},
        RS: {link: 'https://pt.wikipedia.org/wiki/RS', color: getRandomInt(50)},
        SC: {link: 'https://pt.wikipedia.org/wiki/SC', color: getRandomInt(50)},
        SL: {link: 'https://pt.wikipedia.org/wiki/SL', color: getRandomInt(50)},
        SG: {link: 'https://pt.wikipedia.org/wiki/SG', color: getRandomInt(50)},
        SK: {link: 'https://pt.wikipedia.org/wiki/SK', color: getRandomInt(50)},
        SI: {link: 'https://pt.wikipedia.org/wiki/SI', color: getRandomInt(50)},
        SB: {link: 'https://pt.wikipedia.org/wiki/SB', color: getRandomInt(50)},
        SO: {link: 'https://pt.wikipedia.org/wiki/SO', color: getRandomInt(50)},
        ZA: {link: 'https://pt.wikipedia.org/wiki/ZA', color: getRandomInt(50)},
        KR: {link: 'https://pt.wikipedia.org/wiki/KR', color: getRandomInt(50)},
        SS: {link: 'https://pt.wikipedia.org/wiki/SS', color: getRandomInt(50)},
        ES: {link: 'https://pt.wikipedia.org/wiki/ES', color: getRandomInt(50)},
        LK: {link: 'https://pt.wikipedia.org/wiki/LK', color: getRandomInt(50)},
        SD: {link: 'https://pt.wikipedia.org/wiki/SD', color: getRandomInt(50)},
        SR: {link: 'https://pt.wikipedia.org/wiki/SR', color: getRandomInt(50)},
        SZ: {link: 'https://pt.wikipedia.org/wiki/SZ', color: getRandomInt(50)},
        SE: {link: 'https://pt.wikipedia.org/wiki/SE', color: getRandomInt(50)},
        CH: {link: 'https://pt.wikipedia.org/wiki/CH', color: getRandomInt(50)},
        TW: {link: 'https://pt.wikipedia.org/wiki/TW', color: getRandomInt(50)},
        TJ: {link: 'https://pt.wikipedia.org/wiki/TJ', color: getRandomInt(50)},
        TZ: {link: 'https://pt.wikipedia.org/wiki/TZ', color: getRandomInt(50)},
        TH: {link: 'https://pt.wikipedia.org/wiki/TH', color: getRandomInt(50)},
        TL: {link: 'https://pt.wikipedia.org/wiki/TL', color: getRandomInt(50)},
        TG: {link: 'https://pt.wikipedia.org/wiki/TG', color: getRandomInt(50)},
        TO: {link: 'https://pt.wikipedia.org/wiki/TO', color: getRandomInt(50)},
        TT: {link: 'https://pt.wikipedia.org/wiki/TT', color: getRandomInt(50)},
        TN: {link: 'https://pt.wikipedia.org/wiki/TN', color: getRandomInt(50)},
        TR: {link: 'https://pt.wikipedia.org/wiki/TR', color: getRandomInt(50)},
        TM: {link: 'https://pt.wikipedia.org/wiki/TM', color: getRandomInt(50)},
        TV: {link: 'https://pt.wikipedia.org/wiki/TV', color: getRandomInt(50)},
        UG: {link: 'https://pt.wikipedia.org/wiki/UG', color: getRandomInt(50)},
        UA: {link: 'https://pt.wikipedia.org/wiki/UA', color: getRandomInt(50)},
        AE: {link: 'https://pt.wikipedia.org/wiki/AE', color: getRandomInt(50)},
        GB: {link: 'https://pt.wikipedia.org/wiki/GB', color: getRandomInt(50)},
        US: {link: 'https://pt.wikipedia.org/wiki/US', color: getRandomInt(50)},
        UY: {link: 'https://pt.wikipedia.org/wiki/UY', color: getRandomInt(50)},
        UZ: {link: 'https://pt.wikipedia.org/wiki/UZ', color: getRandomInt(50)},
        VU: {link: 'https://pt.wikipedia.org/wiki/VU', color: getRandomInt(50)},
        VE: {link: 'https://pt.wikipedia.org/wiki/VE', color: getRandomInt(50)},
        VN: {link: 'https://pt.wikipedia.org/wiki/VN', color: getRandomInt(50)},
        YE: {link: 'https://pt.wikipedia.org/wiki/YE', color: getRandomInt(50)},
        ZM: {link: 'https://pt.wikipedia.org/wiki/ZM', color: getRandomInt(50)},
        ZW: {link: 'https://pt.wikipedia.org/wiki/ZW', color: getRandomInt(50)}
    }
}
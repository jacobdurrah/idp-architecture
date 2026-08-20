(function (D) {
  var locs = [
    {
      id: "hudson",
      n: "60 Hudson Street",
      city: "New York",
      addr: "60 Hudson Street, Tribeca, New York, NY 10013",
      look: "A full-block brick mountain by Ralph Walker. The brick goes from dark to light as it rises. It looks like a 1930 Western Union fortress, because it was.",
      whyHere: "Every long-haul and subsea landing that wants the Northeast still shows up in this hall. A fire here is a multi-carrier event.",
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/60_Hudson_Street.jpg/960px-60_Hudson_Street.jpg",
      credit: "Beyond My Ken, Wikimedia Commons",
      hrefs: [
        { n: "Wikipedia", href: "https://en.wikipedia.org/wiki/60_Hudson_Street" },
        { n: "Wikimedia photo", href: "https://commons.wikimedia.org/wiki/File:60_Hudson_Street.jpg" }
      ]
    },
    {
      id: "cermak",
      n: "350 East Cermak Road",
      city: "Chicago",
      addr: "350 East Cermak Road, Chicago, IL 60616",
      look: "Gothic brick fortress that used to print the Sears catalog; the slab was poured for presses, which is why it now holds cages.",
      whyHere: "Internet exchange and financial exchange in one pile. Digital Realty is the landlord (ORD10). Equinix CH1, CH2, and CH4 sit on the upper floors. The building MMR is on the second floor.",
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Calumet_Plant_R_R_Donnelly_and_Sons_Company_A_Chicago_IL.jpg/960px-Calumet_Plant_R_R_Donnelly_and_Sons_Company_A_Chicago_IL.jpg",
      credit: "Andrew Jameson, Wikimedia Commons",
      hrefs: [
        { n: "Wikipedia", href: "https://en.wikipedia.org/wiki/R.R._Donnelley_and_Sons_Co._Calumet_Plant" },
        { n: "Digital Realty ORD10", href: "https://www.digitalrealty.com/data-centers/americas/chicago/ord10" },
        { n: "Equinix CH1", href: "https://www.equinix.com/data-centers/americas-colocation/united-states-colocation/chicago-data-centers/ch1" },
        { n: "Wikimedia photo", href: "https://commons.wikimedia.org/wiki/File:Calumet_Plant_R_R_Donnelly_and_Sons_Company_A_Chicago_IL.jpg" }
      ]
    },
    {
      id: "onewilshire",
      n: "One Wilshire",
      city: "Los Angeles",
      addr: "624 S Grand Avenue, Downtown Los Angeles, CA 90017",
      look: "Looks like an ordinary office tower. The product is the 4th-floor MMR.",
      whyHere: "Classic West Coast meet-me. CoreSite LA1 and Any2 live here.",
      photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/One_Wilshire%2C_Los_Angeles.jpg/960px-One_Wilshire%2C_Los_Angeles.jpg",
      credit: "Frederick Dennstedt, Wikimedia Commons",
      hrefs: [
        { n: "Wikipedia", href: "https://en.wikipedia.org/wiki/One_Wilshire" },
        { n: "CoreSite LA1", href: "https://www.coresite.com/data-center/la1-los-angeles-ca" },
        { n: "Wikimedia photo", href: "https://commons.wikimedia.org/wiki/File:One_Wilshire,_Los_Angeles.jpg" }
      ]
    }
  ];
  ["hotel", "mmr", "xconnect"].forEach(function (k) {
    if (D[k]) D[k].locations = locs;
  });
})(window.IDP_DATA);

import { Coordinate, District, DistrictWithRinks, RinkWithDistrict } from "../models/Rink";

const rinkSource: { [key: string]: any } = {
  cdn: {
    district: "Côte-des-Neiges - Notre-Dame-de-Grâce",
    rinks: [
      {
        name: "Georges-Saint-Pierre",
        description: "Aire de patinage libre",
        type: "PPL",
        rink_name: "Aire de patinage libre, Georges-Saint-Pierre (PPL)",
        coordinates: {
          latitude: 45.4685286,
          longitude: -73.6080182,
        },
      },
      {
        name: "MacDonald",
        description: "Aire de patinage libre",
        type: "PPL",
        rink_name: "Aire de patinage libre, MacDonald (PPL)",
        coordinates: {
          latitude: 45.4845029,
          longitude: -73.6411984,
        },
      },
      {
        name: "Mackenzie-King",
        description: "Aire de patinage libre",
        type: "PPL",
        rink_name: "Aire de patinage libre, Mackenzie-King (PPL)",
        coordinates: {
          latitude: 45.4898979,
          longitude: -73.63372450000001,
        },
      },
      {
        name: "Martin-Luther-King",
        description: "Aire de patinage libre",
        type: "PPL",
        rink_name: "Aire de patinage libre, Martin-Luther-King (PPL)",
        coordinates: {
          latitude: 45.50524,
          longitude: -73.63150399999999,
        },
      },
      {
        name: "Notre-Dame-de-Grâce",
        description: "Aire de patinage libre",
        type: "PPL",
        rink_name: "Aire de patinage libre, Notre-Dame-de-Grâce (PPL)",
        coordinates: {
          latitude: 45.4660994,
          longitude: -73.6396329,
        },
      },
      {
        name: "William-Hurst",
        description: "Aire de patinage libre",
        type: "PP",
        rink_name: "Aire de patinage libre, William-Hurst (PP)",
        coordinates: {
          latitude: 45.4695738,
          longitude: -73.6308552,
        },
      },
      {
        name: "Mackenzie-King",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes , Mackenzie-King (PSE)",
        coordinates: {
          latitude: 45.4898979,
          longitude: -73.63372450000001,
        },
      },
      {
        name: "Trenholme",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes , Trenholme (PSE)",
        coordinates: {
          latitude: 45.4566389,
          longitude: -73.6469858,
        },
      },
      {
        name: "Georges-Saint-Pierre",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Georges-Saint-Pierre (PSE)",
        coordinates: {
          latitude: 45.4685286,
          longitude: -73.6080182,
        },
      },
      {
        name: "Jean-Brillant",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Jean-Brillant (PSE)",
        coordinates: {
          latitude: 45.4929315,
          longitude: -73.6245398,
        },
      },
      {
        name: "MacDonald",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, MacDonald (PSE)",
        coordinates: {
          latitude: 45.4845029,
          longitude: -73.6411984,
        },
      },
      {
        name: "Martin-Luther-King (nord)",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Martin-Luther-King (nord) (PSE)",
        coordinates: {
          latitude: 45.50524,
          longitude: -73.63150399999999,
        },
      },
      {
        name: "Martin-Luther-King (sud)",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Martin-Luther-King (sud) (PSE)",
        coordinates: {
          latitude: 45.50524,
          longitude: -73.63150399999999,
        },
      },
      {
        name: "Notre-Dame-de-Grâce",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Notre-Dame-de-Grâce (PSE)",
        coordinates: {
          latitude: 45.4660994,
          longitude: -73.6396329,
        },
      },
      {
        name: "William-Bowie",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, William-Bowie (PSE)",
        coordinates: {
          latitude: 45.4576098,
          longitude: -73.6488883,
        },
      },
      {
        name: "William-Hurst",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, William-Hurst (PSE)",
        coordinates: {
          latitude: 45.4695738,
          longitude: -73.6308552,
        },
      },
      {
        name: "Confédération",
        description: "Patinoire Bleu-Blanc-Bouge",
        type: "PSE",
        rink_name: "Patinoire Bleu-Blanc-Bouge, Confédération (PSE)",
        coordinates: {
          latitude: 45.4723525,
          longitude: -73.6394522,
        },
      },
    ],
    coordinates: {
      latitude: 45.4767847,
      longitude: -73.61431329999999,
    },
  },
  sle: {
    district: "Saint-Léonard",
    rinks: [
      {
        name: "C.C.S.L.",
        description: "Anneau de glace",
        type: "PPL",
        rink_name: "Anneau de glace, C.C.S.L. (PPL)",
        coordinates: {
          latitude: 45.4996164,
          longitude: -73.57310439999999,
        },
      },
      {
        name: "parc Laurier-MacDonald",
        description: "Anneau de glace",
        type: "PPL",
        rink_name: "Anneau de glace, parc Laurier-MacDonald (PPL)",
        coordinates: {
          latitude: 45.5775574,
          longitude: -73.5875907,
        },
      },
      {
        name: "parc Delorme",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Delorme (PSE)",
        coordinates: {
          latitude: 45.5905637,
          longitude: -73.5884047,
        },
      },
      {
        name: "parc Ferland",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Ferland (PSE)",
        coordinates: {
          latitude: 45.596846,
          longitude: -73.5997666,
        },
      },
      {
        name: "parc Ladauversière",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Ladauversière (PSE)",
        coordinates: {
          latitude: 45.5816162,
          longitude: -73.58318899999999,
        },
      },
      {
        name: "parc Pie-XII",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Pie-XII (PSE)",
        coordinates: {
          latitude: 45.5886023,
          longitude: -73.6080169,
        },
      },
      {
        name: "parc Giuseppe-Garibaldi",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Giuseppe-Garibaldi (PPL)",
        coordinates: {
          latitude: 45.5869461,
          longitude: -73.57207439999999,
        },
      },
      {
        name: "parc Ladauversière",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Ladauversière (PPL)",
        coordinates: {
          latitude: 45.5816162,
          longitude: -73.58318899999999,
        },
      },
      {
        name: "C.S.S.L",
        description: "Patinoire sans bande",
        type: "PPL",
        rink_name: "Patinoire sans bande, C.S.S.L (PPL)",
        coordinates: {
          latitude: 45.56208059999999,
          longitude: -73.61054539999999,
        },
      },
      {
        name: "parc Luigi-Pirandello",
        description: "Patinoire sans bande",
        type: "PPL",
        rink_name: "Patinoire sans bande, parc Luigi-Pirandello (PPL)",
        coordinates: {
          latitude: 45.5779837,
          longitude: -73.6037824,
        },
      },
    ],
    coordinates: {
      latitude: 45.58305350000001,
      longitude: -73.5806921,
    },
  },
  ibi: {
    district: "L'Île-Bizard - Sainte-Geneviève",
    rinks: [
      {
        name: "Parc Eugène-Dostie",
        description: "Anneau de glace",
        type: "PPL",
        rink_name: "Anneau de glace, Parc Eugène-Dostie (PPL)",
        coordinates: {
          latitude: 45.48753749999999,
          longitude: -73.8837685,
        },
      },
      {
        name: "Parc Eugène-Dostie",
        description: "Carré de glace",
        type: "PPL",
        rink_name: "Carré de glace, Parc Eugène-Dostie (PPL)",
        coordinates: {
          latitude: 45.48753749999999,
          longitude: -73.8837685,
        },
      },
      {
        name: "Parc Jonathan-Wilson",
        description: "Patinoire # 1",
        type: "PSE",
        rink_name: "Patinoire # 1, Parc Jonathan-Wilson (PSE)",
        coordinates: {
          latitude: 45.5006543,
          longitude: -73.87199609999999,
        },
      },
      {
        name: "Parc Joseph-Avila-Proulx",
        description: "Patinoire # 1",
        type: "PSE",
        rink_name: "Patinoire # 1, Parc Joseph-Avila-Proulx (PSE)",
        coordinates: {
          latitude: 45.4968458,
          longitude: -73.8823419,
        },
      },
      {
        name: "Parc Robert-Sauvé",
        description: "Patinoire # 1",
        type: "PSE",
        rink_name: "Patinoire # 1, Parc Robert-Sauvé (PSE)",
        coordinates: {
          latitude: 45.4813131,
          longitude: -73.866691,
        },
      },
      {
        name: "Parc Eugène-Dostie",
        description: "Patinoire # 2",
        type: "PSE",
        rink_name: "Patinoire # 2, Parc Eugène-Dostie (PSE)",
        coordinates: {
          latitude: 45.48753749999999,
          longitude: -73.8837685,
        },
      },
      {
        name: "Parc Eugène-Dostie",
        description: "Patinoire Coach Ken",
        type: "PSE",
        rink_name: "Patinoire Coach Ken, Parc Eugène-Dostie (PSE)",
        coordinates: {
          latitude: 45.48753749999999,
          longitude: -73.8837685,
        },
      },
    ],
    coordinates: {
      latitude: 45.4948893,
      longitude: -73.89075559999999,
    },
  },
  anj: {
    district: "Anjou",
    rinks: [
      {
        name: "Parc Lucie-Bruneau",
        description: "Anneau de glace",
        type: "PPL",
        rink_name: "Anneau de glace, Parc Lucie-Bruneau (PPL)",
        coordinates: {
          latitude: 45.604415,
          longitude: -73.5841204,
        },
      },
      {
        name: "Parc Talcy",
        description: "Anneau de glace",
        type: "PPL",
        rink_name: "Anneau de glace, Parc Talcy (PPL)",
        coordinates: {
          latitude: 45.607129,
          longitude: -73.5599556,
        },
      },
      {
        name: "Parc Des Roseraies",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc Des Roseraies (PSE)",
        coordinates: {
          latitude: 45.5943471,
          longitude: -73.5552282,
        },
      },
      {
        name: "Parc Lucie-Bruneau",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc Lucie-Bruneau (PSE)",
        coordinates: {
          latitude: 45.604415,
          longitude: -73.5841204,
        },
      },
      {
        name: "Parc Roger Rousseau",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc Roger Rousseau (PSE)",
        coordinates: {
          latitude: 45.6172658,
          longitude: -73.54955919999999,
        },
      },
      {
        name: "Parc Des Roseraies",
        description: "Sentier glacé",
        type: "PP",
        rink_name: "Sentier glacé, Parc Des Roseraies (PP)",
        coordinates: {
          latitude: 45.5943471,
          longitude: -73.5552282,
        },
      },
    ],
    coordinates: {
      latitude: 45.6123487,
      longitude: -73.5553355,
    },
  },
  pmr: {
    district: "Le Plateau-Mont-Royal",
    rinks: [
      {
        name: "La Fontaine",
        description: "Grande patinoire avec bandes",
        type: "PSE",
        rink_name: "Grande patinoire avec bandes, La Fontaine (PSE)",
        coordinates: {
          latitude: 45.5273219,
          longitude: -73.5703556,
        },
      },
      {
        name: "De Gaspé/Bernard",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes , De Gaspé/Bernard (PSE)",
        coordinates: {
          latitude: 45.52751199999999,
          longitude: -73.597355,
        },
      },
      {
        name: "Baldwin",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Baldwin (PSE)",
        coordinates: {
          latitude: 45.5262851,
          longitude: -73.5879707,
        },
      },
      {
        name: "Jeanne-Mance",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Jeanne-Mance (PSE)",
        coordinates: {
          latitude: 45.5175663,
          longitude: -73.5886699,
        },
      },
      {
        name: "Sir-Wilfrid-Laurier no 1",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Sir-Wilfrid-Laurier no 1 (PSE)",
        coordinates: {
          latitude: 45.5229468,
          longitude: -73.59319789999999,
        },
      },
      {
        name: "Sir-Wilfrid-Laurier no 2",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Sir-Wilfrid-Laurier no 2 (PSE)",
        coordinates: {
          latitude: 45.5330839,
          longitude: -73.5888439,
        },
      },
      {
        name: "Baldwin",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Baldwin (PPL)",
        coordinates: {
          latitude: 45.5262851,
          longitude: -73.5879707,
        },
      },
      {
        name: "Jeanne-Mance",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Jeanne-Mance (PPL)",
        coordinates: {
          latitude: 45.5175663,
          longitude: -73.5886699,
        },
      },
      {
        name: "Sir-Wilfrid-Laurier",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Sir-Wilfrid-Laurier (PPL)",
        coordinates: {
          latitude: 45.5330839,
          longitude: -73.5888439,
        },
      },
      {
        name: "Arena Mont-Royal",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Arena Mont-Royal (PP)",
        coordinates: {
          latitude: 45.5333859,
          longitude: -73.5717796,
        },
      },
      {
        name: "De Lorimier",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, De Lorimier (PP)",
        coordinates: {
          latitude: 45.5374141,
          longitude: -73.5811519,
        },
      },
      {
        name: "La Fontaine",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, La Fontaine (PP)",
        coordinates: {
          latitude: 45.5273219,
          longitude: -73.5703556,
        },
      },
      {
        name: "La Fontaine",
        description: "Petite patinoire avec bandes",
        type: "PSE",
        rink_name: "Petite patinoire avec bandes, La Fontaine (PSE)",
        coordinates: {
          latitude: 45.5273219,
          longitude: -73.5703556,
        },
      },
    ],
    coordinates: {
      latitude: 45.5262851,
      longitude: -73.5879707,
    },
  },
  out: {
    district: "Outremont",
    rinks: [
      {
        name: "Parc Beaubien",
        description: "Grande patinoire de hockey",
        type: "PSE",
        rink_name: "Grande patinoire de hockey, Parc Beaubien (PSE)",
        coordinates: {
          latitude: 45.5156782,
          longitude: -73.60862709999999,
        },
      },
      {
        name: "Parc Pratt",
        description: "Patinoire de hockey et patin libre",
        type: "PPL",
        rink_name: "Patinoire de hockey et patin libre, Parc Pratt (PPL)",
        coordinates: {
          latitude: 45.5140286,
          longitude: -73.6185788,
        },
      },
      {
        name: "Parc Oakwood",
        description: "Patinoire de hockey",
        type: "PPL",
        rink_name: "Patinoire de hockey, Parc Oakwood (PPL)",
        coordinates: {
          latitude: 45.51309819999999,
          longitude: -73.6006747,
        },
      },
      {
        name: "Parc Jacques-Parizeau",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Parc Jacques-Parizeau (PPL)",
        coordinates: {
          latitude: 45.5117686,
          longitude: -73.6172421,
        },
      },
      {
        name: "Parc Outremont",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Parc Outremont (PPL)",
        coordinates: {
          latitude: 45.5182082,
          longitude: -73.60463419999999,
        },
      },
      {
        name: "Parc Beaubien",
        description: "Petite patinoire de hockey",
        type: "PSE",
        rink_name: "Petite patinoire de hockey, Parc Beaubien (PSE)",
        coordinates: {
          latitude: 45.5156782,
          longitude: -73.60862709999999,
        },
      },
    ],
    coordinates: {
      latitude: 45.5175945,
      longitude: -73.6109554,
    },
  },
  lch: {
    district: "Lachine",
    rinks: [
      {
        name: "parc LaSalle",
        description: "Pat. avec bandes - près chalet",
        type: "PSE",
        rink_name: "Pat. avec bandes - près chalet, parc LaSalle (PSE)",
        coordinates: {
          latitude: 45.43865390000001,
          longitude: -73.6743104,
        },
      },
      {
        name: "parc LaSalle",
        description: "Pat. avec bandes - près 10e Avenue",
        type: "PSE",
        rink_name: "Pat. avec bandes - près 10e Avenue, parc LaSalle (PSE)",
        coordinates: {
          latitude: 45.43865390000001,
          longitude: -73.6743104,
        },
      },
      {
        name: "parc Carignan",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Carignan (PSE)",
        coordinates: {
          latitude: 45.4433976,
          longitude: -73.7019842,
        },
      },
      {
        name: "parc Dixie",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Dixie (PSE)",
        coordinates: {
          latitude: 45.4431099,
          longitude: -73.7182031,
        },
      },
      {
        name: "parc Duff court",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Duff court (PSE)",
        coordinates: {
          latitude: 45.44692910000001,
          longitude: -73.6806562,
        },
      },
      {
        name: "parc Kirkland",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, parc Kirkland (PSE)",
        coordinates: {
          latitude: 45.4459897,
          longitude: -73.6498474,
        },
      },
      {
        name: "club pêcheurs/chasseurs",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, club pêcheurs/chasseurs (PPL)",
        coordinates: {
          latitude: 45.4419094,
          longitude: -73.6925445,
        },
      },
      {
        name: "parc Carignan",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Carignan (PPL)",
        coordinates: {
          latitude: 45.4433976,
          longitude: -73.7019842,
        },
      },
      {
        name: "parc Kirkland",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Kirkland (PPL)",
        coordinates: {
          latitude: 45.4459897,
          longitude: -73.6498474,
        },
      },
      {
        name: "parc LaSalle",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc LaSalle (PPL)",
        coordinates: {
          latitude: 45.43865390000001,
          longitude: -73.6743104,
        },
      },
      {
        name: "parc Rosewood",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Rosewood (PPL)",
        coordinates: {
          latitude: 45.44972240000001,
          longitude: -73.652484,
        },
      },
    ],
    coordinates: {
      latitude: 45.4419094,
      longitude: -73.6925445,
    },
  },
  mhm: {
    district: "Mercier - Hochelaga-Maisonneuve",
    rinks: [
      {
        name: "Liébert",
        description: "Patinoire à bandes",
        type: "PSE",
        rink_name: "Patinoire à bandes, Liébert (PSE)",
        coordinates: {
          latitude: 45.595759,
          longitude: -73.5231393,
        },
      },
      {
        name: "De La Bruère",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, De La Bruère (PSE)",
        coordinates: {
          latitude: 45.5932491,
          longitude: -73.5192646,
        },
      },
      {
        name: "Jean-Amyot",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Jean-Amyot (PSE)",
        coordinates: {
          latitude: 45.575841,
          longitude: -73.539627,
        },
      },
      {
        name: "Lalancette",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Lalancette (PSE)",
        coordinates: {
          latitude: 45.5481158,
          longitude: -73.5484006,
        },
      },
      {
        name: "Pierre-Bédard",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Pierre-Bédard (PSE)",
        coordinates: {
          latitude: 45.578712,
          longitude: -73.5566518,
        },
      },
      {
        name: "Saint-Aloysius",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Saint-Aloysius (PSE)",
        coordinates: {
          latitude: 45.545898,
          longitude: -73.5409899,
        },
      },
      {
        name: "Saint-Victor",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Saint-Victor (PSE)",
        coordinates: {
          latitude: 45.6107525,
          longitude: -73.5152366,
        },
      },
      {
        name: "Thomas-Chapais",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Thomas-Chapais (PSE)",
        coordinates: {
          latitude: 45.6080464,
          longitude: -73.5370492,
        },
      },
      {
        name: "Beauclerk",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Beauclerk (PPL)",
        coordinates: {
          latitude: 45.5843033,
          longitude: -73.5293119,
        },
      },
      {
        name: "Jean-Amyot",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Jean-Amyot (PPL)",
        coordinates: {
          latitude: 45.575841,
          longitude: -73.539627,
        },
      },
      {
        name: "Lalancette",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Lalancette (PPL)",
        coordinates: {
          latitude: 45.5481158,
          longitude: -73.5484006,
        },
      },
      {
        name: "Pierre-Bédard",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Pierre-Bédard (PPL)",
        coordinates: {
          latitude: 45.578712,
          longitude: -73.5566518,
        },
      },
      {
        name: "Pierre-Bernard",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Pierre-Bernard (PPL)",
        coordinates: {
          latitude: 45.6069759,
          longitude: -73.5276575,
        },
      },
      {
        name: "Rougemont",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Rougemont (PPL)",
        coordinates: {
          latitude: 45.5687272,
          longitude: -73.5264464,
        },
      },
      {
        name: "Saint-Aloysius",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-Aloysius (PPL)",
        coordinates: {
          latitude: 45.545898,
          longitude: -73.5409899,
        },
      },
      {
        name: "Saint-Victor",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-Victor (PPL)",
        coordinates: {
          latitude: 45.6107525,
          longitude: -73.5152366,
        },
      },
      {
        name: "Théodore",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Théodore (PPL)",
        coordinates: {
          latitude: 45.5584073,
          longitude: -73.5383286,
        },
      },
    ],
    coordinates: {
      latitude: 45.582811,
      longitude: -73.54322230000001,
    },
  },
  ver: {
    district: "Verdun",
    rinks: [
      {
        name: "Parc de la Fontaine",
        description: "Patinoire à bandes",
        type: "PSE",
        rink_name: "Patinoire à bandes, Parc de la Fontaine (PSE)",
        coordinates: {
          latitude: 45.4635441,
          longitude: -73.5431156,
        },
      },
      {
        name: "Parc Elgar",
        description: "Patinoire à bandes",
        type: "PSE",
        rink_name: "Patinoire à bandes, Parc Elgar (PSE)",
        coordinates: {
          latitude: 45.4706309,
          longitude: -73.58737169999999,
        },
      },
      {
        name: "Reine-Elisabeth",
        description: "Patinoire à bandes",
        type: "PSE",
        rink_name: "Patinoire à bandes, Reine-Elisabeth (PSE)",
        coordinates: {
          latitude: 45.438539,
          longitude: -73.5927842,
        },
      },
      {
        name: "Parc Willibrord",
        description: "Patinoire Bleu Blanc Bouge",
        type: "PSE",
        rink_name: "Patinoire Bleu Blanc Bouge, Parc Willibrord (PSE)",
        coordinates: {
          latitude: 45.4591667,
          longitude: -73.57562659999999,
        },
      },
      {
        name: "Natatorium",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Natatorium (PP)",
        coordinates: {
          latitude: 45.4437535,
          longitude: -73.5760564,
        },
      },
      {
        name: "Parc de la Fontaine",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Parc de la Fontaine (PP)",
        coordinates: {
          latitude: 45.4635441,
          longitude: -73.5431156,
        },
      },
      {
        name: "Parc Duquette",
        description: "Patinoire décorative",
        type: "PSE",
        rink_name: "Patinoire décorative, Parc Duquette (PSE)",
        coordinates: {
          latitude: 45.4659886,
          longitude: -73.5748816,
        },
      },
      {
        name: "Parc Elgar",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Parc Elgar (PP)",
        coordinates: {
          latitude: 45.4706309,
          longitude: -73.58737169999999,
        },
      },
      {
        name: "Parc Willibrord",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Parc Willibrord (PP)",
        coordinates: {
          latitude: 45.4591667,
          longitude: -73.57562659999999,
        },
      },
      {
        name: "Reine-Elisabeth",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Reine-Elisabeth (PP)",
        coordinates: {
          latitude: 45.438539,
          longitude: -73.5927842,
        },
      },
    ],
    coordinates: {
      latitude: 45.4626418,
      longitude: -73.5634882,
    },
  },
  pir: {
    district: "Pierrefonds - Roxboro",
    rinks: [
      {
        name: "Parc Grier",
        description: "Patinoire avec bande",
        type: "PSE",
        rink_name: "Patinoire avec bande, Parc Grier (PSE)",
        coordinates: {
          latitude: 45.457258,
          longitude: -73.8843751,
        },
      },
      {
        name: "Parc de Roxboro",
        description: "Patinoire avec bandes Nord",
        type: "PSE",
        rink_name: "Patinoire avec bandes Nord, Parc de Roxboro (PSE)",
        coordinates: {
          latitude: 45.5033809,
          longitude: -73.7929405,
        },
      },
      {
        name: "Parc Alexander",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc Alexander (PSE)",
        coordinates: {
          latitude: 45.4751558,
          longitude: -73.8559051,
        },
      },
      {
        name: "Parc Brook",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc Brook (PSE)",
        coordinates: {
          latitude: 45.510074,
          longitude: -73.8432438,
        },
      },
      {
        name: "Parc d'À-Ma-Baie",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc d'À-Ma-Baie (PSE)",
        coordinates: {
          latitude: 45.5048057,
          longitude: -73.7832097,
        },
      },
      {
        name: "Parc de la Rive-Boisée",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc de la Rive-Boisée (PSE)",
        coordinates: {
          latitude: 45.4987112,
          longitude: -73.8544194,
        },
      },
      {
        name: "Parc de Roxboro",
        description: "Patinoire avec bandes Sud",
        type: "PSE",
        rink_name: "Patinoire avec bandes Sud, Parc de Roxboro (PSE)",
        coordinates: {
          latitude: 45.5033809,
          longitude: -73.7929405,
        },
      },
      {
        name: "Parc Brook",
        description: "Patinoire de patin libre Est",
        type: "PPL",
        rink_name: "Patinoire de patin libre Est, Parc Brook (PPL)",
        coordinates: {
          latitude: 45.510074,
          longitude: -73.8432438,
        },
      },
      {
        name: "Parc Brook",
        description: "Patinoire de patin libre Ouest",
        type: "PPL",
        rink_name: "Patinoire de patin libre Ouest, Parc Brook (PPL)",
        coordinates: {
          latitude: 45.510074,
          longitude: -73.8432438,
        },
      },
      {
        name: "Parc d'À-Ma-Baie",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Parc d'À-Ma-Baie (PPL)",
        coordinates: {
          latitude: 45.5048057,
          longitude: -73.7832097,
        },
      },
      {
        name: "Parc de la Rive-Boisée",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Parc de la Rive-Boisée (PPL)",
        coordinates: {
          latitude: 45.4987112,
          longitude: -73.8544194,
        },
      },
      {
        name: "Parc de Roxboro",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Parc de Roxboro (PPL)",
        coordinates: {
          latitude: 45.5033809,
          longitude: -73.7929405,
        },
      },
      {
        name: "Parc Grier",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Parc Grier (PPL)",
        coordinates: {
          latitude: 45.457258,
          longitude: -73.8843751,
        },
      },
      {
        name: "Parc Grier",
        description: "Patinoire de patin libre sentier",
        type: "PPL",
        rink_name: "Patinoire de patin libre sentier, Parc Grier (PPL)",
        coordinates: {
          latitude: 45.457258,
          longitude: -73.8843751,
        },
      },
      {
        name: "Parc Alexander",
        description: "Patinoire de patin libre Sud",
        type: "PPL",
        rink_name: "Patinoire de patin libre Sud, Parc Alexander (PPL)",
        coordinates: {
          latitude: 45.4751558,
          longitude: -73.8559051,
        },
      },
    ],
    coordinates: {
      latitude: 45.482163,
      longitude: -73.8621589,
    },
  },
  vsp: {
    district: "Villeray-Saint-Michel - Parc-Extension",
    rinks: [
      {
        name: "Villeray",
        description: "Patinoire avec bandes - Nord",
        type: "PSE",
        rink_name: "Patinoire avec bandes - Nord, Villeray (PSE)",
        coordinates: {
          latitude: 45.5481165,
          longitude: -73.624751,
        },
      },
      {
        name: "Villeray",
        description: "Patinoire avec bandes - Sud",
        type: "PSE",
        rink_name: "Patinoire avec bandes - Sud, Villeray (PSE)",
        coordinates: {
          latitude: 45.5481165,
          longitude: -73.624751,
        },
      },
      {
        name: "Champdoré",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Champdoré (PSE)",
        coordinates: {
          latitude: 45.5715023,
          longitude: -73.6358143,
        },
      },
      {
        name: "Nicolas-Tillemont",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Nicolas-Tillemont (PSE)",
        coordinates: {
          latitude: 45.5547222,
          longitude: -73.6125,
        },
      },
      {
        name: "Jarry",
        description: "Patinoire avec bandes nord",
        type: "PSE",
        rink_name: "Patinoire avec bandes nord, Jarry (PSE)",
        coordinates: {
          latitude: 45.5431671,
          longitude: -73.6283636,
        },
      },
      {
        name: "Jarry",
        description: "Patinoire avec bandes sud",
        type: "PSE",
        rink_name: "Patinoire avec bandes sud, Jarry (PSE)",
        coordinates: {
          latitude: 45.5431671,
          longitude: -73.6283636,
        },
      },
      {
        name: "De Normanville",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, De Normanville (PPL)",
        coordinates: {
          latitude: 45.5423332,
          longitude: -73.6071876,
        },
      },
      {
        name: "Nicolas-Tillemont",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Nicolas-Tillemont (PPL)",
        coordinates: {
          latitude: 45.5547222,
          longitude: -73.6125,
        },
      },
      {
        name: "Ovila-Légaré",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Ovila-Légaré (PP)",
        coordinates: {
          latitude: 45.5815844,
          longitude: -73.6232224,
        },
      },
      {
        name: "Howard",
        description: "Patinoire de patinage libre",
        type: "PPL",
        rink_name: "Patinoire de patinage libre, Howard (PPL)",
        coordinates: {
          latitude: 45.5588033,
          longitude: -73.5983835,
        },
      },
      {
        name: "François-Perrault",
        description: "Patinoire décorative",
        type: "PPL",
        rink_name: "Patinoire décorative, François-Perrault (PPL)",
        coordinates: {
          latitude: 45.56060910000001,
          longitude: -73.60223979999999,
        },
      },
      {
        name: "Bleu Blanc Bouge F-Perrault",
        description: "Patinoire réfrigérée",
        type: "PSE",
        rink_name: "Patinoire réfrigérée, Bleu Blanc Bouge F-Perrault (PSE)",
        coordinates: {
          latitude: 45.563089,
          longitude: -73.6014368,
        },
      },
    ],
    coordinates: {
      latitude: 45.5588033,
      longitude: -73.5983835,
    },
  },
  mno: {
    district: "Montréal-Nord",
    rinks: [
      {
        name: "parc Charleroi",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes , parc Charleroi (PSE)",
        coordinates: {
          latitude: 45.5994693,
          longitude: -73.62217559999999,
        },
      },
      {
        name: "parc Oscar",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes , parc Oscar (PSE)",
        coordinates: {
          latitude: 45.5822655,
          longitude: -73.6483198,
        },
      },
      {
        name: "parc Sauvé",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes , parc Sauvé (PSE)",
        coordinates: {
          latitude: 45.5997232,
          longitude: -73.6362843,
        },
      },
      {
        name: "parc Sauvé",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre , parc Sauvé (PPL)",
        coordinates: {
          latitude: 45.5997232,
          longitude: -73.6362843,
        },
      },
      {
        name: "parc Charleroi",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Charleroi (PPL)",
        coordinates: {
          latitude: 45.5994693,
          longitude: -73.62217559999999,
        },
      },
      {
        name: "parc Lacordaire",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, parc Lacordaire (PPL)",
        coordinates: {
          latitude: 45.616632,
          longitude: -73.6307331,
        },
      },
      {
        name: "Bleu Blanc Bouge Le Carignan",
        description: "Patinoire réfrigérée",
        type: "PSE",
        rink_name: "Patinoire réfrigérée,Bleu Blanc Bouge Le Carignan (PSE)",
        coordinates: {
          latitude: 45.6099006,
          longitude: -73.6158166,
        },
      },
    ],
    coordinates: {
      latitude: 45.6067159,
      longitude: -73.6200782,
    },
  },
  rpp: {
    district: "Rosemont - La Petite-Patrie",
    rinks: [
      {
        name: "Beaubien",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Beaubien (PSE)",
        coordinates: {
          latitude: 45.5557517,
          longitude: -73.5856807,
        },
      },
      {
        name: "Cité-Jardin",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Cité-Jardin (PSE)",
        coordinates: {
          latitude: 45.5712813,
          longitude: -73.5603366,
        },
      },
      {
        name: "De Gaspé",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, De Gaspé (PSE)",
        coordinates: {
          latitude: 45.5280646,
          longitude: -73.6149523,
        },
      },
      {
        name: "De la Louisiane",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, De la Louisiane (PSE)",
        coordinates: {
          latitude: 45.5683326,
          longitude: -73.57234509999999,
        },
      },
      {
        name: "Du Pélican",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Du Pélican (PSE)",
        coordinates: {
          latitude: 45.5608572,
          longitude: -73.5738906,
        },
      },
      {
        name: "Lafond",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Lafond (PSE)",
        coordinates: {
          latitude: 45.5535227,
          longitude: -73.5747344,
        },
      },
      {
        name: "Père-Marquette",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Père-Marquette (PSE)",
        coordinates: {
          latitude: 45.5409291,
          longitude: -73.59356249999999,
        },
      },
      {
        name: "Beaubien",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Beaubien (PPL)",
        coordinates: {
          latitude: 45.5557517,
          longitude: -73.5856807,
        },
      },
      {
        name: "Cité-Jardin",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Cité-Jardin (PPL)",
        coordinates: {
          latitude: 45.5712813,
          longitude: -73.5603366,
        },
      },
      {
        name: "De la Louisiane",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, De la Louisiane (PPL)",
        coordinates: {
          latitude: 45.5683326,
          longitude: -73.57234509999999,
        },
      },
      {
        name: "Du Pélican",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Du Pélican (PPL)",
        coordinates: {
          latitude: 45.5608572,
          longitude: -73.5738906,
        },
      },
      {
        name: "Joseph-Paré",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Joseph-Paré (PPL)",
        coordinates: {
          latitude: 45.5746605,
          longitude: -73.5709291,
        },
      },
      {
        name: "Lafond",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Lafond (PPL)",
        coordinates: {
          latitude: 45.5535227,
          longitude: -73.5747344,
        },
      },
      {
        name: "Père-Marquette",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Père-Marquette (PPL)",
        coordinates: {
          latitude: 45.5409291,
          longitude: -73.59356249999999,
        },
      },
      {
        name: "Sainte-Bernadette",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Sainte-Bernadette (PPL)",
        coordinates: {
          latitude: 45.5615549,
          longitude: -73.5873397,
        },
      },
      {
        name: "De la Petite-Italie",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, De la Petite-Italie (PP)",
        coordinates: {
          latitude: 45.5324569,
          longitude: -73.6113766,
        },
      },
      {
        name: "Maisonneuve",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Maisonneuve (PP)",
        coordinates: {
          latitude: 45.561201,
          longitude: -73.55485019999999,
        },
      },
      {
        name: "Molson",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Molson (PP)",
        coordinates: {
          latitude: 45.5486505,
          longitude: -73.5888334,
        },
      },
    ],
    coordinates: {
      latitude: 45.5608572,
      longitude: -73.5738906,
    },
  },
  ahc: {
    district: "Ahuntsic - Cartierville",
    rinks: [
      {
        name: "Berthe-Louard",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Berthe-Louard (PSE)",
        coordinates: {
          latitude: 45.5563482,
          longitude: -73.6435158,
        },
      },
      {
        name: "De Louisbourg",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, De Louisbourg (PSE)",
        coordinates: {
          latitude: 45.5325278,
          longitude: -73.7012581,
        },
      },
      {
        name: "Des Hirondelles",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Des Hirondelles (PSE)",
        coordinates: {
          latitude: 45.5755015,
          longitude: -73.6425452,
        },
      },
      {
        name: "Saint-Alphonse",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Saint-Alphonse (PSE)",
        coordinates: {
          latitude: 45.5487036,
          longitude: -73.6384429,
        },
      },
      {
        name: "Saint-André-Apôtre",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Saint-André-Apôtre (PSE)",
        coordinates: {
          latitude: 45.54650609999999,
          longitude: -73.67032669999999,
        },
      },
      {
        name: "Saint-Paul-de-la-Croix",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Saint-Paul-de-la-Croix (PSE)",
        coordinates: {
          latitude: 45.5593504,
          longitude: -73.6613076,
        },
      },
      {
        name: "Sault-au-Récollet",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Sault-au-Récollet (PSE)",
        coordinates: {
          latitude: 45.5732794,
          longitude: -73.648039,
        },
      },
      {
        name: "De Mésy",
        description: "Patinoire Bleu blanc bouge",
        type: "PSE",
        rink_name: "Patinoire Bleu blanc bouge, De Mésy (PSE)",
        coordinates: {
          latitude: 45.529866,
          longitude: -73.717249,
        },
      },
      {
        name: "Berthe-Louard",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Berthe-Louard (PPL)",
        coordinates: {
          latitude: 45.5563482,
          longitude: -73.6435158,
        },
      },
      {
        name: "Camille",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Camille (PPL)",
        coordinates: {
          latitude: 45.5094061,
          longitude: -73.7521621,
        },
      },
      {
        name: "De Bordeaux",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, De Bordeaux (PPL)",
        coordinates: {
          latitude: 45.5508605,
          longitude: -73.6560631,
        },
      },
      {
        name: "De Louisbourg",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, De Louisbourg (PPL)",
        coordinates: {
          latitude: 45.5325278,
          longitude: -73.7012581,
        },
      },
      {
        name: "Henri-Julien",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Henri-Julien (PPL)",
        coordinates: {
          latitude: 45.542256,
          longitude: -73.633071,
        },
      },
      {
        name: "Nicolas-Viel",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Nicolas-Viel (PPL)",
        coordinates: {
          latitude: 45.5506839,
          longitude: -73.67723699999999,
        },
      },
      {
        name: "Saint-Alphonse",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-Alphonse (PPL)",
        coordinates: {
          latitude: 45.5487036,
          longitude: -73.6384429,
        },
      },
      {
        name: "Saint-André-Apôtre",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-André-Apôtre (PPL)",
        coordinates: {
          latitude: 45.54650609999999,
          longitude: -73.67032669999999,
        },
      },
      {
        name: "Saint-Paul-de-la-Croix",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-Paul-de-la-Croix (PPL)",
        coordinates: {
          latitude: 45.5593504,
          longitude: -73.6613076,
        },
      },
      {
        name: "Saint-Simon-Apôtre",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-Simon-Apôtre (PPL)",
        coordinates: {
          latitude: 45.539655,
          longitude: -73.6471348,
        },
      },
      {
        name: "Sault-au-Récollet",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Sault-au-Récollet (PPL)",
        coordinates: {
          latitude: 45.5732794,
          longitude: -73.648039,
        },
      },
    ],
    coordinates: {
      latitude: 45.5508605,
      longitude: -73.6560631,
    },
  },
  sou: {
    district: "Le Sud-Ouest",
    rinks: [
      {
        name: "Campbell-Ouest",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Campbell-Ouest (PSE)",
        coordinates: {
          latitude: 45.4581021,
          longitude: -73.59165,
        },
      },
      {
        name: "Carré Hibernia",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Carré Hibernia (PSE)",
        coordinates: {
          latitude: 45.4788404,
          longitude: -73.5643984,
        },
      },
      {
        name: "Ignace-Bourget",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Ignace-Bourget (PSE)",
        coordinates: {
          latitude: 45.4557809,
          longitude: -73.60578230000002,
        },
      },
      {
        name: "Le Ber",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Le Ber (PSE)",
        coordinates: {
          latitude: 45.4772466,
          longitude: -73.5539697,
        },
      },
      {
        name: "Polyvalente Saint-Henri",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Polyvalente Saint-Henri (PSE)",
        coordinates: {
          latitude: 45.4773919,
          longitude: -73.5848072,
        },
      },
      {
        name: "Vinet",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Vinet (PSE)",
        coordinates: {
          latitude: 45.4843193,
          longitude: -73.5755853,
        },
      },
      {
        name: "Campbell-Ouest",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Campbell-Ouest (PP)",
        coordinates: {
          latitude: 45.4581021,
          longitude: -73.59165,
        },
      },
      {
        name: "Carré Hibernia",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Carré Hibernia (PP)",
        coordinates: {
          latitude: 45.4788404,
          longitude: -73.5643984,
        },
      },
      {
        name: "Gédéon-de-Catalogne",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Gédéon-de-Catalogne (PP)",
        coordinates: {
          latitude: 45.471973,
          longitude: -73.5833176,
        },
      },
      {
        name: "Le Ber",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Le Ber (PP)",
        coordinates: {
          latitude: 45.4772466,
          longitude: -73.5539697,
        },
      },
      {
        name: "Polyvalente Saint-Henri",
        description: "Patinoire Décorative",
        type: "PP",
        rink_name: "Patinoire Décorative, Polyvalente Saint-Henri (PP)",
        coordinates: {
          latitude: 45.4773919,
          longitude: -73.5848072,
        },
      },
      {
        name: "Vinet",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Vinet (PP)",
        coordinates: {
          latitude: 45.4843193,
          longitude: -73.5755853,
        },
      },
    ],
    coordinates: {
      latitude: 45.4705621,
      longitude: -73.5908213,
    },
  },
  rdp: {
    district: "Rivière-des-Prairies - Pointe-aux-Trembles",
    rinks: [
      {
        name: "Des Cageux",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Des Cageux (PSE)",
        coordinates: {
          latitude: 45.67234879999999,
          longitude: -73.54208179999999,
        },
      },
      {
        name: "Don-Bosco",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Don-Bosco (PSE)",
        coordinates: {
          latitude: 45.6443911,
          longitude: -73.5885481,
        },
      },
      {
        name: "Gérard-Vaillancourt",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Gérard-Vaillancourt (PSE)",
        coordinates: {
          latitude: 45.6665876,
          longitude: -73.5022011,
        },
      },
      {
        name: "Montmartre",
        description: "Patinoire avec bandes",
        type: "PPL",
        rink_name: "Patinoire avec bandes, Montmartre (PPL)",
        coordinates: {
          latitude: 45.674084,
          longitude: -73.502411,
        },
      },
      {
        name: "Parc Hans-Selye",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Parc Hans-Selye (PSE)",
        coordinates: {
          latitude: 45.63127009999999,
          longitude: -73.60241789999999,
        },
      },
      {
        name: "Pehr-Kalm",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Pehr-Kalm (PSE)",
        coordinates: {
          latitude: 45.6638235,
          longitude: -73.5520918,
        },
      },
      {
        name: "Sainte-Maria-Goretti",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Sainte-Maria-Goretti (PSE)",
        coordinates: {
          latitude: 45.6955482,
          longitude: -73.4858847,
        },
      },
      {
        name: "Saint-Jean-Baptiste",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Saint-Jean-Baptiste (PSE)",
        coordinates: {
          latitude: 45.6412051,
          longitude: -73.4996136,
        },
      },
      {
        name: "Daniel-Johnson",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Daniel-Johnson (PP)",
        coordinates: {
          latitude: 45.6504167,
          longitude: -73.5009286,
        },
      },
      {
        name: "Des Cageux",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Des Cageux (PPL)",
        coordinates: {
          latitude: 45.67234879999999,
          longitude: -73.54208179999999,
        },
      },
      {
        name: "Don-Bosco",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Don-Bosco (PPL)",
        coordinates: {
          latitude: 45.6443911,
          longitude: -73.5885481,
        },
      },
      {
        name: "Jeanne-Lapierre",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Jeanne-Lapierre (PPL)",
        coordinates: {
          latitude: 45.6604228,
          longitude: -73.5156099,
        },
      },
      {
        name: "Saint-Jean-Baptiste",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Saint-Jean-Baptiste (PPL)",
        coordinates: {
          latitude: 45.6412051,
          longitude: -73.4996136,
        },
      },
      {
        name: "Y-Thériault/Sherbrooke",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Y-Thériault/Sherbrooke (PPL)",
        coordinates: {
          latitude: 45.6565594,
          longitude: -73.5093931,
        },
      },
    ],
    coordinates: {
      latitude: 45.64404709999999,
      longitude: -73.5859392,
    },
  },
  vma: {
    district: "Ville-Marie",
    rinks: [
      {
        name: "Des Vétérans",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Des Vétérans (PSE)",
        coordinates: {
          latitude: 45.5240996,
          longitude: -73.5548689,
        },
      },
      {
        name: "Toussaint-Louverture",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Toussaint-Louverture (PSE)",
        coordinates: {
          latitude: 45.5124438,
          longitude: -73.5646668,
        },
      },
      {
        name: "Walter-Stewart",
        description: "Patinoire avec bandes",
        type: "PSE",
        rink_name: "Patinoire avec bandes, Walter-Stewart (PSE)",
        coordinates: {
          latitude: 45.533292,
          longitude: -73.5562451,
        },
      },
      {
        name: "Walter-Stewart",
        description: "Patinoire de patin libre",
        type: "PPL",
        rink_name: "Patinoire de patin libre, Walter-Stewart (PPL)",
        coordinates: {
          latitude: 45.533292,
          longitude: -73.5562451,
        },
      },
      {
        name: "du Glacis",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, du Glacis (PP)",
        coordinates: {
          latitude: 45.5132155,
          longitude: -73.550916,
        },
      },
      {
        name: "Toussaint-Louverture",
        description: "Patinoire décorative",
        type: "PP",
        rink_name: "Patinoire décorative, Toussaint-Louverture (PP)",
        coordinates: {
          latitude: 45.5124438,
          longitude: -73.5646668,
        },
      },
      {
        name: "Esplanade Tranquille",
        description: "Patinoire réfrigérée",
        type: "PP",
        rink_name: "Patinoire réfrigérée, Esplanade Tranquille (PP)",
        coordinates: {
          latitude: 45.509607,
          longitude: -73.5649782,
        },
      },
      {
        name: "Lac aux Castors ,",
        description: "Patinoire réfrigérée",
        type: "PP",
        rink_name: "Patinoire réfrigérée, Lac aux Castors , (PP)",
        coordinates: {
          latitude: 45.4988179,
          longitude: -73.5973997,
        },
      },
      {
        name: "Square Cabot",
        description: "Patinoire réfrigérée",
        type: "PP",
        rink_name: "Patinoire réfrigérée, Square Cabot (PP)",
        coordinates: {
          latitude: 45.48953299999999,
          longitude: -73.58362009999999,
        },
      },
      {
        name: "Des Faubourgs",
        description: "Patinoire sans bandes",
        type: "PPL",
        rink_name: "Patinoire sans bandes, Des Faubourgs (PPL)",
        coordinates: {
          latitude: 45.52810789999999,
          longitude: -73.55738509999999,
        },
      },
    ],
    coordinates: {
      latitude: 45.4987392,
      longitude: -73.5704313,
    },
  },
  sla: {
    district: "Saint-Laurent",
    rinks: [
      {
        name: "Parc Beaudet",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Beaudet (PP)",
        coordinates: {
          latitude: 45.5096014,
          longitude: -73.6763756,
        },
      },
      {
        name: "Parc Beaulac",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Beaulac (PP)",
        coordinates: {
          latitude: 45.519989,
          longitude: -73.6777481,
        },
      },
      {
        name: "Parc Chamberland",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Chamberland (PP)",
        coordinates: {
          latitude: 45.5029541,
          longitude: -73.6894678,
        },
      },
      {
        name: "Parc Gohier",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Gohier (PP)",
        coordinates: {
          latitude: 45.5086299,
          longitude: -73.6814392,
        },
      },
      {
        name: "Parc Hartenstein",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Hartenstein (PP)",
        coordinates: {
          latitude: 45.5180085,
          longitude: -73.6911032,
        },
      },
      {
        name: "Parc Houde",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Houde (PP)",
        coordinates: {
          latitude: 45.5010116,
          longitude: -73.68071809999999,
        },
      },
      {
        name: "Parc Petit",
        description: "Patinoire de patin libre",
        type: "PP",
        rink_name: "Patinoire de patin libre, Parc Petit (PP)",
        coordinates: {
          latitude: 45.5200637,
          longitude: -73.6954879,
        },
      },
      {
        name: "Parc Cousineau",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Cousineau (PSE)",
        coordinates: {
          latitude: 45.5212665,
          longitude: -73.69065930000001,
        },
      },
      {
        name: "Parc Gohier",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Gohier (PSE)",
        coordinates: {
          latitude: 45.5086299,
          longitude: -73.6814392,
        },
      },
      {
        name: "Parc Houde",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Houde (PSE)",
        coordinates: {
          latitude: 45.5010116,
          longitude: -73.68071809999999,
        },
      },
      {
        name: "Parc Noël-Nord",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Noël-Nord (PSE)",
        coordinates: {
          latitude: 45.5176314,
          longitude: -73.728706,
        },
      },
      {
        name: "Parc Painter",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Painter (PSE)",
        coordinates: {
          latitude: 45.52922220000001,
          longitude: -73.6759527,
        },
      },
      {
        name: "Parc Petit",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Petit (PSE)",
        coordinates: {
          latitude: 45.5200637,
          longitude: -73.6954879,
        },
      },
      {
        name: "Parc Poirier",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure , Parc Poirier (PSE)",
        coordinates: {
          latitude: 45.5147048,
          longitude: -73.6630205,
        },
      },
      {
        name: "Parc Beaulac",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure, Parc Beaulac (PSE)",
        coordinates: {
          latitude: 45.519989,
          longitude: -73.6777481,
        },
      },
      {
        name: "Parc Chamberland",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure, Parc Chamberland (PSE)",
        coordinates: {
          latitude: 45.5029541,
          longitude: -73.6894678,
        },
      },
      {
        name: "Parc Decelles",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure, Parc Decelles (PSE)",
        coordinates: {
          latitude: 45.513918,
          longitude: -73.67761519999999,
        },
      },
      {
        name: "Parc du Bois-Franc",
        description: "Patinoire extérieure",
        type: "PSE",
        rink_name: "Patinoire extérieure, Parc du Bois-Franc (PSE)",
        coordinates: {
          latitude: 45.5157791,
          longitude: -73.7089471,
        },
      },
      {
        name: "Parc Philippe-Laheurte",
        description: "Patinoire extérieure",
        type: "PPL",
        rink_name: "Patinoire extérieure, Parc Philippe-Laheurte (PPL)",
        coordinates: {
          latitude: 45.5064454,
          longitude: -73.7164566,
        },
      },
      {
        name: "Parc Decelle",
        description: "Patinoire sport d'équipe",
        type: "PSE",
        rink_name: "Patinoire sport d'équipe, Parc Decelle (PSE)",
        coordinates: {
          latitude: 45.513918,
          longitude: -73.67761519999999,
        },
      },
      {
        name: "Parc Cousineau",
        description: "Rond de glace",
        type: "PP",
        rink_name: "Rond de glace , Parc Cousineau (PP)",
        coordinates: {
          latitude: 45.5212665,
          longitude: -73.69065930000001,
        },
      },
      {
        name: "Parc Noël-Nord",
        description: "Rond de glace",
        type: "PP",
        rink_name: "Rond de glace , Parc Noël-Nord (PP)",
        coordinates: {
          latitude: 45.5176314,
          longitude: -73.728706,
        },
      },
      {
        name: "Parc Painter",
        description: "Rond de glace",
        type: "PPL",
        rink_name: "Rond de glace , Parc Painter (PPL)",
        coordinates: {
          latitude: 45.52922220000001,
          longitude: -73.6759527,
        },
      },
      {
        name: "Parc du Bois-Franc",
        description: "Rond de glace",
        type: "PPL",
        rink_name: "Rond de glace, Parc du Bois-Franc (PPL)",
        coordinates: {
          latitude: 45.5157791,
          longitude: -73.7089471,
        },
      },
      {
        name: "Parc Saint-Laurent",
        description: "Rond de glace",
        type: "PP",
        rink_name: "Rond de glace, Parc Saint-Laurent (PP)",
        coordinates: {
          latitude: 45.5274272,
          longitude: -73.6875234,
        },
      },
    ],
    coordinates: {
      latitude: 45.5022961,
      longitude: -73.70606599999999,
    },
  },
  lsl: {
    district: "LaSalle",
    rinks: [
      {
        name: "parc Hayward",
        description: "Patinoire ext avec bandes (BBB)",
        type: "PSE",
        rink_name: "Patinoire ext avec bandes (BBB) , parc Hayward (PSE)",
        coordinates: {
          latitude: 45.4230116,
          longitude: -73.6480661,
        },
      },
      {
        name: "parc des Rapides",
        description: "Patinoire ext. avec bandes",
        type: "PSE",
        rink_name: "Patinoire ext. avec bandes, parc des Rapides (PSE)",
        coordinates: {
          latitude: 45.4267195,
          longitude: -73.5954616,
        },
      },
      {
        name: "parc Lefebvre",
        description: "Patinoire ext. avec bandes",
        type: "PSE",
        rink_name: "Patinoire ext. avec bandes, parc Lefebvre (PSE)",
        coordinates: {
          latitude: 45.4362573,
          longitude: -73.63497629999999,
        },
      },
      {
        name: "parc Raymond",
        description: "Patinoire ext. avec bandes",
        type: "PSE",
        rink_name: "Patinoire ext. avec bandes, parc Raymond (PSE)",
        coordinates: {
          latitude: 45.4279994,
          longitude: -73.6031423,
        },
      },
      {
        name: "parc Riverside",
        description: "Patinoire ext. avec bandes",
        type: "PSE",
        rink_name: "Patinoire ext. avec bandes, parc Riverside (PSE)",
        coordinates: {
          latitude: 45.4209898,
          longitude: -73.6116764,
        },
      },
      {
        name: "parc Hayward",
        description: "Patinoire ext. sans bandes",
        type: "PPL",
        rink_name: "Patinoire ext. sans bandes, parc Hayward (PPL)",
        coordinates: {
          latitude: 45.4230116,
          longitude: -73.6480661,
        },
      },
    ],
    coordinates: {
      latitude: 45.4305611,
      longitude: -73.6346777,
    },
  },
};


export type RinksSources = { [key: string]: DistrictWithRinks };

export const getRink = (
  districtName: string,
  rinkName: string
): RinkWithDistrict => {
  const district = getDistrict(districtName);
  const rink = district.rinks.find(
    (rink: any) => rink.rink_name === rinkName
  );
  if (!rink) {
    throw new Error(`rink ${rinkName} not found in ${districtName}`);
  }
  return {
    ...rink,
    district: district.district,
    districtAbv: districtName,
  };
};

export const getDistrict = (
  districtName: string
): DistrictWithRinks => {
  if (!(districtName in rinkSource)) {
    throw new Error(`District ${districtName} not found`);
  }
  return rinkSource[districtName];
};

export const getAllDistrict = (): District[] => {
  return Object.keys(rinkSource).map((key) => {
    return {
      ...rinkSource[key],
      districtAbv: key,
    };
  });
};

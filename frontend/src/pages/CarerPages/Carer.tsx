// FILE: CarersPage.tsx (Updated)

import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip, Chip, Avatar } from "@mui/material";
import { Calendar, Edit2, Key, List, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import PhoneInput from "../../components/form/group-input/PhoneInput";
import { EnvelopeIcon } from "../../icons";
import DataTable from "../../components/common/DataTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import CommonModal from "../../components/common/CommonModal";
import toast from "react-hot-toast";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import { Tab, Tabs } from "@mui/material";

// --- DUMMY DATA AND TYPES MODIFICATIONS ---

// 1. Assuming a minimalist base User interface for demonstration purposes
// You should ensure this matches the actual 'User' type in your '../types/auth'
interface BaseUser {
  _id: string;
  userId?: string; // Required by the error message
  name: string;
  phone: string;
  address: string;
  isActive: string;
  type?: string;
  password?: string;
  details?: string;
  schedule?: string;
  position?: string;
  email?: string;
  comment?: string;
}

const DUMMY_CARER_DATA: BaseUser[] = [
  {
    _id: "1",
    userId: "CA1001",
    name: "Fatima  Abdi",
    address: "14 Tamworth Apartment, 47 Moss Lane West, Manchester, M15 5PE",
    phone: "07707040600",
    isActive: "Not Activated",
    schedule: "Y",
    details: "",
    position: "Coordinator",
  },
  {
    _id: "2",
    userId: "CA1002",
    name: "Noreen  Butt",
    address: "4 Silverdale Road, Chorlton, Manchester, M21 0SH",
    phone: "07701063489",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "3",
    userId: "CA1003",
    name: "Fatima  Abanur",
    address: "16 Clinton Avenue, Fallowfield, Manchester, M14 7LW",
    phone: "07957110777",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "4",
    userId: "CA1004",
    name: "Amina Abdalla",
    address: "1 Backwell Street, Manchester, M11 1NE",
    phone: "07961016924",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "5",
    userId: "CA1005",
    name: "Dafdeel Abdon",
    address: "4 Woodacre, Manchester, m16 8QQ",
    phone: "07979412868",
    isActive: "Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "6",
    userId: "CA1006",
    name: "Adetobi Abiodun",
    address:
      "Apartment 27, 34 Hulme Hight Street, M15 5JS, Manchester, M15 5JS",
    phone: "07494267469",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "7",
    userId: "CA1007",
    name: "Olamide Emmanuel Abolarin",
    address: "14, Albert Avenue,, Gorton, M18 7JX",
    phone: "07901378091",
    isActive: "Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "8",
    userId: "CA1008",
    name: "Joy Adebanjo",
    address: "156 Chapel Street, Salford, Manchester, M3 6ET",
    phone: "07780453222",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "9",
    userId: "CA1009",
    name: "Ilhamo  Ahmed",
    address:
      "71 Randolph Street, Levenshulme, Moss Side   Manchester,, Lancashire, M19 3BW",
    phone: "07548860356",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "10",
    userId: "CA1010",
    name: "Asma Mobeen Ahmed",
    address: "213 St.Helens Road, Bolton, BL33PY",
    phone: "07495139391",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "11",
    userId: "CA1011",
    name: "Ayan  Ali",
    address: "119 Caythorpe Street,, Manchester,, Lancashire, M14 4UL",
    phone: "07576667114",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "12",
    userId: "CA1012",
    name: "Madina Shakh Ali",
    address: "5 Bowes Street, M14 4UZ, Manchester, M14 4UZ",
    phone: "07961002767",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "13",
    userId: "CA1013",
    name: "Deeqa Ali",
    address: "34 Beever Street, Manchester, M16 9JR, Manchester, M16 9JR",
    phone: "07454400852",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "14",
    userId: "CA1014",
    name: "Reshma Ali",
    address: "17 Brogan Street, MANCHESTER, M18 8UD",
    phone: "07478354463",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "15",
    userId: "CA1015",
    name: "Asif Ali",
    address: "66 Premier Street Manchester, Manchester, M16 9ND",
    phone: "N/A",
    isActive: "Not Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "16",
    userId: "CA1016",
    name: "Waqas Ali",
    address: "",
    phone: "7771280003",
    isActive: "Not Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "17",
    userId: "CA1017",
    name: "Vanessa Andre",
    address: "19, Henbury Street, Manchester, M14 7JE",
    phone: "07479026059",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "18",
    userId: "CA1018",
    name: "Mercy Anuoluwapo",
    address: "3, Nona Street, Manchester, M6 5PG",
    phone: "07752698778",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "19",
    userId: "CA1019",
    name: "Abdellah Assafni",
    address: "35 Auburn Road, Manchester, M16 9WS",
    phone: "07904599543",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "20",
    userId: "CA1020",
    name: "Khadija  Awale",
    address: "1 Fairlawn Close, Manchester, M14 4gq, m14 4gq",
    phone: "07572 347096",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "21",
    userId: "CA1021",
    name: "Ayshea Bhikha",
    address: "8 Darnley Street, Old Trafford, Manchester, Lancashire, M16 9NF",
    phone: "07877538136",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "22",
    userId: "CA1022",
    name: "Stacey  Blundell",
    address: "3 Galgate Close, Hulme, M15 5AJ",
    phone: "07398521514",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "23",
    userId: "CA1023",
    name: "Najma Butt",
    address: "35 Auburn Road, Manchester, Lancashire, m16 9WS",
    phone: "07583149928",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Senior Care Worker",
  },
  {
    _id: "24",
    userId: "CA1024",
    name: "Imelda Bytautaite",
    address: "107 Edge Lane, Manchester, M21 9JF, M21 9JF",
    phone: "07884467071",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "25",
    userId: "CA1025",
    name: "Muhammad Muaaz  Chohan",
    address: "",
    phone: "0786858339",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "26",
    userId: "CA1026",
    name: "Max Choudhury",
    address: "8 Lucien Close, Manchester, Lancashire, M12 4WR",
    phone: "07535033395",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "27",
    userId: "CA1027",
    name: "Jemima Jane  Clarke",
    address: "158A Palatine Road, Manchester, M20 2QH",
    phone: "07840946627",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "28",
    userId: "CA1028",
    name: "Jemima Clarke",
    address: "",
    phone: "07840946627",
    isActive: "Not Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "29",
    userId: "CA1029",
    name: "Susan Clement",
    address: "22 Rimmer Close Beswick, Manchester, M11 3AD",
    phone: "07948501101",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "30",
    userId: "CA1030",
    name: "Saidou Diallo",
    address: "155, Vine Street, Manchester, M18 8SG",
    phone: "07492604546",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "31",
    userId: "CA1031",
    name: "Istahil Elmi",
    address: "1 Chattock St, Manchester, M16 7NJ",
    phone: "07539974244",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "32",
    userId: "CA1032",
    name: "Ebrahim  Esmail Bhana",
    address: "97 Langshaw Street,, Manchester,, Lancashire, M16 9LD",
    phone: "07859901421",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "33",
    userId: "CA1033",
    name: "Roda Farah",
    address: "35 Whitmore Road, M14 7RH",
    phone: "07985746952",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "34",
    userId: "CA1034",
    name: "Ahmad Fraz",
    address: "80 FAIRY LANE, Manchester, M8 8YD",
    phone: "07863921451",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "35",
    userId: "CA1035",
    name: "Nosheen Gul",
    address: "Apartment 11 25C Victory Street, Manchester, County, M14 5AE",
    phone: "07444610263",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "36",
    userId: "CA1036",
    name: "Maryan Haji",
    address: "101 Caythorpe Street, Manchester, M14 4UH",
    phone: "07849782333",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "37",
    userId: "CA1037",
    name: "Fathia  Hassan",
    address: "5 Seedley Street, Manchester, M14 7WF",
    phone: "07799970021",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "38",
    userId: "CA1038",
    name: "Kaltun Hassan",
    address: "11 Ploughbank Drive, Manchester, Lancashire, M21 7UB",
    phone: "07984627602",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "39",
    userId: "CA1039",
    name: "Rukhsana Hussain",
    address: "141 Clarendon Road, Manchester, M16 8LE",
    phone: "07514149930",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "40",
    userId: "CA1040",
    name: "Hibo Hussein",
    address: "6 Darnley Street, Old Trafford, Manchester, Lancashire, M16 9NF",
    phone: "07903041755",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "41",
    userId: "CA1041",
    name: "MALKA  IBRAHIM",
    address: "88 COVERDALE CRESENT ARDWICK, MANCHESTER, LANCASHIRE, M214BJ",
    phone: "07979426042",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "42",
    userId: "CA1042",
    name: "Maria Iqbal",
    address: "19 St Werburgh's Road, Manchester, Lancashire, M21 0TL",
    phone: "07521788111",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "43",
    userId: "CA1043",
    name: "Omar Mohamed Sedik Bakry Ismail",
    address: "6 Norfolk Avenue, Manchester, Lancashire, M18 7BF",
    phone: "07342917959",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "44",
    userId: "CA1044",
    name: "Samia Isman",
    address: "336 Yew Tree Road, Manchester,, Manchester, M20 3FR",
    phone: "07477226555",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "45",
    userId: "CA1045",
    name: "Dabbo Jilo",
    address: "1 Lingard Street, Manchester, sk5 6ab",
    phone: "07512473030",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "46",
    userId: "CA1046",
    name: "Bunmi Christiana  Junaid",
    address: "54 Broadway, Manchester, M50 2UF, M50 2UF",
    phone: "07466185723",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "47",
    userId: "CA1047",
    name: "Moniba Junaid",
    address: "33 Morris Street, OL4 1EL",
    phone: "07551587318",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "48",
    userId: "CA1048",
    name: "Nabeela Khanam",
    address: "15 Longford Close, Manchester, M32 0HU",
    phone: "07449339989",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "49",
    userId: "CA1049",
    name: "Asim Latif",
    address: "554 Kings Road, Stretford, M32 8JT, Manchester, M32 8JT",
    phone: "07933826977",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "50",
    userId: "CA1050",
    name: "Yvonne  Marie Eaves",
    address: "34 Overdale Road, Wythenshawe, Manchester, Lancashire, M22 4PX",
    phone: "07517412930",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "51",
    userId: "CA1051",
    name: "Saqib Mehmood",
    address: "6 Village Street, Salford, Manchester, Lancashire, M7 2JF",
    phone: "07727860413",
    isActive: "Not Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "52",
    userId: "CA1052",
    name: "Bhushan Mehra",
    address: "88, Ayres Road, Manchester, Lancashire, M16 7GP",
    phone: "07734420003",
    isActive: "Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "53",
    userId: "CA1053",
    name: "Saida Mohamed",
    address: "3 Radstock Close, Manchester, M14 7EL",
    phone: "07703227253",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "54",
    userId: "CA1054",
    name: "Zeinab Mohammed",
    address: "101 Caythorpe St, Manchester,, Lancashire, M14 4UH",
    phone: "07424526645",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "55",
    userId: "CA1055",
    name: "Hibaq  Mohamoud",
    address: "50 Brunt Street, M14 4BE",
    phone: "07946346048",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "56",
    userId: "CA1056",
    name: "Marion Mullen",
    address: "4 Silverdale Road Chorlton, Manchester, Lancashire, M21 0SH",
    phone: "07982923259",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "57",
    userId: "CA1057",
    name: "Zak Nabi",
    address: "217 Withington Road, Manchester, Lancashire, M16-8LU",
    phone: "07780655933",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "58",
    userId: "CA1058",
    name: "Aisha Nadeem",
    address: "3 St.Annes Road, Manchester, Lancashire, M21 8PA",
    phone: "07511912237",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "59",
    userId: "CA1059",
    name: "Aminat Ogunjobi",
    address: "21 Amersham Park Road, Salford, M6 5TQ",
    phone: "07487272883",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "60",
    userId: "CA1060",
    name: "Tolulope  Oluseun Gbolahan-Amure",
    address: "34 Hulme High Street, Manchester, M15 5JS",
    phone: "07503974069",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "61",
    userId: "CA1061",
    name: "Nishtman Osman",
    address: "10 Leighbrook Road, Manchester, Lancashire, M14 7PX",
    phone: "07526846224",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "62",
    userId: "CA1062",
    name: "Akhila  Parappurath",
    address: "1131 Hyde Road, Manchester, M18 7LN",
    phone: "07393105267",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "63",
    userId: "CA1063",
    name: "Yetunde Rahmon",
    address:
      "Flat 1, 246 Weaste Lane, Salford, M5-5HF, MANCHESTER, LANCASHIRE, M5-5HF",
    phone: "07780995189",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "64",
    userId: "CA1064",
    name: "Nabeel Rauf",
    address: "58 CRANSWICK STREET, Manchester, Lancashire, M147JA",
    phone: "07576470704",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "65",
    userId: "CA1065",
    name: "Hinda Rooble",
    address: "86 Clinton Avenue, Manchester, Lancashire, M14 7LG",
    phone: "07576660253",
    isActive: "Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "66",
    userId: "CA1066",
    name: "Zeinab  S",
    address: "73 Sedgeborough Road, Moss Side, Manchester, M16 7EF",
    phone: "07538543346",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "67",
    userId: "CA1067",
    name: "Humayun Safdar",
    address: "80 Fairy Lane, Manchester, M8 8YD",
    phone: "07362399880",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "68",
    userId: "CA1068",
    name: "Caragh Shakoor",
    address: "12 Wardie Close, Stretford, Manchester, M32 0TE",
    phone: "07506679886",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "69",
    userId: "CA1069",
    name: "Sarah Sharman",
    address:
      "18 Trent Bridge Walk Old Trafford, Manchester, Lancashire, M16 0JR",
    phone: "07759800948",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "70",
    userId: "CA1070",
    name: "Dimple Singh",
    address: "280 Darley Avenue, Manchester, Lancashire, M21 7HS",
    phone: "+447405458871",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "71",
    userId: "CA1071",
    name: "Haseeb Tanvir",
    address: "144 Manchester Road, M14 0DZ",
    phone: "07459507428",
    isActive: "Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "72",
    userId: "CA1072",
    name: "Sharon Threlfall",
    address: "43 Hilary Road, Manchester, Lancashire, M22 1PQ",
    phone: "07432846767",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "",
  },
  {
    _id: "73",
    userId: "CA1073",
    name: "Wubalem Tsegaye",
    address: "64 St James Road, Salford,, M7 4XE",
    phone: "07472221865",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "74",
    userId: "CA1074",
    name: "Nimco Warsame",
    address: "3 Cundiff Road, Manchester, M21 8FS",
    phone: "07426318953",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "75",
    userId: "CA1075",
    name: "Feven Weldedawit",
    address: "73 Benchill Road, Manchester, M22 8EN, Manchester, M22 8EN",
    phone: "07538056129",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "76",
    userId: "CA1076",
    name: "Pakeeza Zafar",
    address: "41 Edge Lane, Manchester, United Kingdom, M21 9JU",
    phone: "07775233042",
    isActive: "Activated",
    schedule: "Y",
    details: "",
    position: "Care Worker",
  },
  {
    _id: "77",
    userId: "CA1077",
    name: "Sahar Zeb",
    address: "120A Dudley Road, Whalley Range, M16 8BR, Manchester, M16 8BR",
    phone: "07307367516",
    isActive: "Activated",
    schedule: "N",
    details: "",
    position: "Care Worker",
  },
];

// --- The rest of the CarersPage component code remains the same ---
// (only the imports and the initial type/data definitions were changed)

const countries = [
  { code: "IN", label: "+91" },
  { code: "US", label: "+1" },
  { code: "GB", label: "+44" },
  { code: "CA", label: "+1" },
  { code: "AU", label: "+61" },
];

interface addCarerData {
  carerId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export default function CarersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Tab indexes
  enum CarerTabs {
    Active = 0,
    Pending = 1,
    Archived = 2,
    All = 3,
  }

  const [activeTab, setActiveTab] = useState<CarerTabs>(CarerTabs.Active);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    console.log("Active Tab:", event);
  };

  const activeCarers = DUMMY_CARER_DATA.filter(
    (c) => c.isActive === "Activated",
  );
  const pendingCarers = DUMMY_CARER_DATA.filter(
    (c) => c.isActive === "Not Activated",
  );

  const archivedCarers: BaseUser[] = [
    {
      _id: "2529",
      name: "Zeinab  S",
      address: "73 Sedgeborough Road, Moss Side, Manchester, M16 7EF",
      phone: "07538543346",
      email: "",
      isActive: "Duplicated",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2314",
      name: "Hijab   Zainab",
      address: "760A, M12 4GD, M12 4GD",
      phone: "07424024695",
      email: "hijab.zainab34@gmail.com",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2415",
      name: "Amina Abdella",
      address:
        "1 Backwell Street, Manchester, Greater Manchester, M11 1EZ, M11 1EZ",
      phone: "07961016924",
      email: "beautybybmoa2@icloud.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "46",
      name: "Amira Abdi",
      address: "10 Mikleby Walk, Manchester, M40 7JQ",
      phone: "07305845341",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2306",
      name: "Najma Abdi",
      address: "59 Viscount Street, Manchester, M14 5UJ",
      phone: "07909551493",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "47",
      name: "Ayan Abdo",
      address: "362 Plymouth Grove, Manchester, M13 0LX",
      phone: "07823470969",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2459",
      name: "Amir Abdullah",
      address:
        "44 Maher Gardens, M15 5PW, Manchester, Manchester, England, M15 5PW",
      phone: "07765647347",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2444",
      name: "Sahra  Abdullahi",
      address: "19 Dartford Close, Manchester, M12 4DW",
      phone: "07944452319",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2316",
      name: "Amina Aden",
      address: "",
      phone: "07956284304",
      email: "amina197783@outlook.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2455",
      name: "Fardowsa Aden",
      address: "26 Eastburn Avenue, Manchester, M40 7WZ, M40 7WZ",
      phone: "07505098543",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2360",
      name: "Busayo Adewuyi",
      address: "16 Southcombe Walk, M15 5NX, Manchester, M15 5NX",
      phone: "07766764983",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2323",
      name: "Fardowsa Ahmed",
      address: "23 Bowes Street, Manchester, Lancashire, M14 4UZ",
      phone: "07871709325",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2416",
      name: "Maryan Ahmed",
      address: "7 Eric Brook Close,, Manchester, County, M14 4EJ, M14 4EJ",
      phone: "07543518024",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "4",
      name: "Khadija  Ali",
      address: "22 High Peak Street, Manchester, M40 3AJ",
      phone: "07706904327",
      email: "khadijaaliii@hotmail.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2359",
      name: "Amal  Ali",
      address: "168 Russell Street, M16 7JL, Manchester, M16 7JL",
      phone: "07876268580",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2362",
      name: "Asif Ali",
      address:
        "14 Derbyshire Crescent, Stretford, Manchester, Lancashire, M32 9LG",
      phone: "07446652348",
      email: "asifalilhr2002@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2417",
      name: "Zahra  Ali",
      address:
        "17 South Street, Longsight, Manchester, Greater Manchester, M12 4PN, M12 4PN",
      phone: "07875328381",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2524",
      name: "Asif  Ali",
      address: "66 Premier Street Manchester, M16 9ND",
      phone: "07376626310",
      email: "",
      isActive: "Duplicated",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2514",
      name: "Ghazala Anjum",
      address: "87 Clarendon Road, Whalley Range, M168JE",
      phone: "07710492202",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "37",
      name: "Fardos Ashrafi",
      address: "76 Broadfield Road, Manchester, M14 4WH",
      phone: "07901000141",
      email: "",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "2381",
      name: "Saba Asif",
      address: "22 Bidston Avenue, Manchester, M14 7BR",
      phone: "07850242205",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2364",
      name: "Noreen Asim",
      address: "209 Kingsway, Manchester, M19 2WB",
      phone: "07467390892",
      email: "1621983asim@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "5",
      name: "Sameera Athar",
      address: "14 Barcheston Road, Cheadle, SK81LL",
      phone: "07513352317",
      email: "",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "8",
      name: "Natasha  Athar",
      address: "2 Wilpshire Avenue, M12 5T",
      phone: "07753337094",
      email: "natasha-miah@hotmail.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2451",
      name: "Muhammad Awais",
      address: "",
      phone: "07472407136",
      email: "mohammedawais4@icloud.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2441",
      name: "Halima  Aweis",
      address: "39 Caythrope Street, Manchester, County, M14 4UE",
      phone: "07940287846",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2450",
      name: "Muhammad Azhar",
      address:
        "20 St.Brannocks Road, Chorlton, Manchester, Lancashire, M21 0UP",
      phone: "07487388482",
      email: "azharsabri4sabri@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2321",
      name: "Jainaba Barrow Bojang",
      address: "21 RPPLETON ROAD, Manchester, LANCASHIRE, M22 9UJ",
      phone: "07956770204",
      email: "jainababarrow100@hotmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "16",
      name: "Roxsana Begum Begum",
      address: "2 Slade Grove, Manchester, M13 0QF",
      phone: "07522285671",
      email: "",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "14",
      name: "Javene  Bernard",
      address: "55 Mackenzie Street, Manchester, Lancashire, M12 5RN",
      phone: "07709781954",
      email: "javbernard2@outlook.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "20",
      name: "Sally Bieeu",
      address: "407 Princess Road, Manchester, M14 7ER",
      phone: "07830524280",
      email: "sbieeu11@gmail.com",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "50",
      name: "Kesiya Binoy",
      address: "30 Delaine Road, Manchester, M20 4QP",
      phone: "07436383105",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "21",
      name: "Sarrah  Biskri",
      address: "53 Denvile Cresent Wythenshaw, Manchester, Lancashire, M22 5EW",
      phone: "07466444299",
      email: "sara_bs11@yahoo.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2424",
      name: "Mulki Mohamed Bulle",
      address:
        "1G Selworthy Road, Manchester, Greater Manchester, M16 7UG, M16 7UG",
      phone: "07514120690",
      email: "mmulki@outlook.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2425",
      name: "Dabbo  Mohamed Bulle",
      address: "54 Church Lane, Manchester, Lancashire, M9 5UQ, M9 5UQ",
      phone: "07427202027",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2420",
      name: "Hodan Dahir",
      address:
        "28 ROSEBERY STREET, Manchester, GREATER MANCHESTER, M14 4UR, m14 4UR",
      phone: "07465986350/ 07988706258",
      email: "hodan.dahir@mail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2310",
      name: "Nadia  Dar",
      address: "1 Lynwood Avenue, Manchester, M16 8JZ",
      phone: "07412223878",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2313",
      name: "Kadiatou Diallo",
      address: "155 Vine Street, Manchester, M19 2DT",
      phone: "07861100092",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2467",
      name: "Mounir  El Ballouti",
      address:
        "Flat 2 Royston Court, Carlton Road, Manchester, County, M16 8LN",
      phone: "07312518738",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "31",
      name: "Duaa El-fitouri",
      address: "88 Ayres Road, Manchester, M16 7GP",
      phone: "07984793031",
      email: "",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "33",
      name: "Aubadah Elfitouri",
      address: "37 Stamford Street, Manchester, Lancahsire, M16 9JJ",
      phone: "07544729773",
      email: "",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "1",
      name: "Mohamed Elmi",
      address: "",
      phone: "123456789",
      email: "mohamed_elmi@hotmail.co.uk",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "2482",
      name: "Tori Espeso-Blake",
      address: "41 Marland Way, Stretford, Manchester, M32 0NP",
      phone: "07495311295",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2440",
      name: "Laila Farah",
      address: "1 Hopkins Street, Manchester, M12 4NY",
      phone: "07908337743",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2320",
      name: "Asad Fayyaz",
      address: "76 Burnley Lane, Oldham, Manchester, Lancashire, OL1 2PW",
      phone: "07753284367",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2488",
      name: "Asad Fayyaz",
      address: "76 Burnley Lane, Oldham, OL1 2PW",
      phone: "07753284367",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2536",
      name: "Carys Gaynor - Lynch",
      address: "82 Overlea Drive, M19 1LS",
      phone: "07738621684",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2457",
      name: "Tolulope Gbolahan-Amure",
      address: "34 Hulme High Street, Manchester, M15 5JS, Manchester, M15 5JS",
      phone: "07503974069",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "41",
      name: "Sarah German",
      address: "60 Parkside Road, Manchester, M14 7JN",
      phone: "07725018920",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2533",
      name: "Suleikhah Haybeh",
      address: "Flat 11, Brookfield Court, Burnage Avenue, Manchester, M19 2JB",
      phone: "7545810807",
      email: "ms_haybeh@hotmail.com",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2309",
      name: "Filsan Husein",
      address: "27 Heyscroft Road, Manchester, M20 4XN",
      phone: "07853301093",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "",
      name: "Rukhsana  Hussain",
      address: "141 Clarendon Road, Manchester, M16 8LE",
      phone: "07514149930",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2539",
      name: "Rukhsana Hussain",
      address: "141 Clarendon Road, Manchester, M16 8LE",
      phone: "07514149930",
      email: "",
      isActive: "Duplicated",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2448",
      name: "Jijo Abdullahi Hussein",
      address:
        "Flat 1, 492 Liverpool Road, Eccles, M30 7HZ, Manchester, M30 7HZ",
      phone: "07546663855",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "27",
      name: "Ayan Ibrahim",
      address: "80 Raby Street, Manchester, Lancashire, M16 7JQ",
      phone: "07534275289",
      email: "",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2443",
      name: "Robert Insaidoo",
      address: "48 Hilden Street, Manchester, BL2 1JA, Manchester, BL2 1JA",
      phone: "07815911036",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2325",
      name: "Maria Iqbal",
      address: "",
      phone: "07521788111",
      email: "",
      isActive: "Duplicated",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2403",
      name: "Nasreen Iqbal",
      address: "139 Barton Lane, Eccles, M30 0HN",
      phone: "07972353191",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2383",
      name: "Rozmina  Kabil",
      address: "44 Maher Gardens, Manchester, M15 5PW",
      phone: "07979029883",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2386",
      name: "Rojina     Kapri",
      address: "139 Clarence Road, County, M13 0YJ",
      phone: "07503627129",
      email: "",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "23",
      name: "Fazilat Khan",
      address: "80 Cringle Road, Manchester, Lancshire, M19 2RT",
      phone: "07415632771",
      email: "",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2520",
      name: "Khalid Khan",
      address: "36 Eastway, Oldham, Manchester, OL2 8NY",
      phone: "07754118003",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2470",
      name: "Umna Khawer",
      address: "13 Ribston Street, Hulme, Manchester, M15 5RH",
      phone: "07897757102",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "11",
      name: "Shantay  Kya Bernard",
      address: "1 Regent Avenue, Manchester, M14 7JQ",
      phone: "07415018711",
      email: "Shantaykb@icloud.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2371",
      name: "Hammed Lawal",
      address: "31 Cicero Street, Manchester, Lancashire, M94GN",
      phone: "07425662072",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "22",
      name: "Amina  Mahamoud",
      address: "19 Cowesby Street, Manchester, Lancashire, M14 4UG",
      phone: "07511737025",
      email: "",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2421",
      name: "Munira Mahdi",
      address: "",
      phone: "07376622775",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2312",
      name: "Asha Mehmood",
      address: "171 Broadfield Road, Manchester, M14 7JH",
      phone: "07447483283",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2464",
      name: "Jigar Modi",
      address: "187 White Acre Road, Ashton-under-Lyne, OL6 9PZ",
      phone: "07774656085",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2406",
      name: "Amran  Mohamed",
      address: "220 Greame Street, Manchester, M14 4JQ",
      phone: "07800814151",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2422",
      name: "Aday Mohamed",
      address: "",
      phone: "07379010174",
      email: "adaymohamed@icloud.com",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2423",
      name: "Lul Mohamed",
      address: "104 Highfield Road, Manchester, Lancashire, M19 4RP, M19 4RP",
      phone: "07776129132",
      email: "quuraxley@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "19",
      name: "Suiaad  Mohamed Hussein",
      address: "388 Platt Lane, Manchester, Lancashire, M14 7HJ",
      phone: "07555568371",
      email: "Taysiir@hotmail.co.uk",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2399",
      name: "Abukar Mohammed",
      address: "10 Caythorpe Street, Manchester, M14 4UD",
      phone: "07849754859",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2372",
      name: "Gini Ahmed Mohamoud",
      address: "48 Moss Lane West, M15 5PD, Manchester, M15 5PD",
      phone: "07491048844",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2368",
      name: "Sherin Babu Mukkungal",
      address: "30 Delaine Road, Withington, M20 4QP, Manchester, M20 4QP",
      phone: "07879993472",
      email: "sherinmukkungal@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "39",
      name: "Vincent Mullen",
      address: "4 Silverdale Road, M21 0SH",
      phone: "07982923259",
      email: "",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2433",
      name: "Miriam Muridi",
      address: "5 Sharcott Close, Manchester, M16 7DU, M16 7DU",
      phone: "07547116462",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2409",
      name: "Oluwabukunmi Mustapha",
      address: "30 Oldfield Road, Salford, Manchester, England, M5 4ZP",
      phone: "07961533068",
      email: "tounmustapha@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "32",
      name: "Sana Nabi",
      address: "Manchester, Lancashire",
      phone: "12345678",
      email: "",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "2460",
      name: "Aisha Nadeem",
      address: "3 St. Annes Road, Manchester, M21 8TA, Manchester, M21 8TA",
      phone: "07511912237",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2516",
      name: "Muhammad Naveed",
      address: "46 Peveril Crecent, Chorlton, M21 9WS",
      phone: "07435813170",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2305",
      name: "Faduma Nur",
      address: "4 Allerford Street, Manchester, M16 7AY",
      phone: "07415486370",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2456",
      name: "Opeyemi Nwanze",
      address: "79 Shrewsbury Close, Middleton, M24 6BZ, Manchester, M24 6BZ",
      phone: "07498865081",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2373",
      name: "John Chiedozie Nwuzor",
      address:
        "Block C Flat 23 Orlando Village, Thynne Street, BL3 6BA, Bolton, Bl3 6BA",
      phone: "07771117091",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2426",
      name: "Fatima Omar",
      address:
        "96 Harington Street, Manchester, Greater Manchester, M14 4RQ, M14 4RQ",
      phone: "07481246026",
      email: "Fatimaa.omarr@outlook.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2517",
      name: "Sahra Omar",
      address: "18 Broadfield Road, Manchester, M14 4WF",
      phone: "7912345678",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2427",
      name: "Anisa Osman",
      address: "125 E Chorlton Road,Manchester,Lancashire,M15 4JG, M15 4JG",
      phone: "07476729729",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2429",
      name: "Mina Pazoki",
      address:
        "6 Assisi Gardens, Manchester, Greater Manchester, M12 5AS, M12 5AS",
      phone: "07846733336",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2542",
      name: "Bethany  Phillips",
      address: "53 Sultan Street, M9 4WS",
      phone: "07305194043",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2388",
      name: "Sandeep Pillai",
      address: "117 Heathcote Road, Manchester, M18 7QL",
      phone: "07796991516",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2551",
      name: "Arfa Qaiser",
      address:
        "Apartment 23c Wilbraham Court, 16-18 Wilbraham Road, Manchester, Lancashire, M14 6JY",
      phone: "07312193537",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "9",
      name: "Nazia Raja",
      address:
        "7 Orchard Cresent, Sockport, Cheshire, Manchester, Lancashire, SK10 4TZ",
      phone: "07940936266",
      email: "niggi888@hotmail.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2317",
      name: "Muhammad Faisal Raja",
      address: "21 Westdale Gardens, Burnage, Manchester, Lancashire, M19 1JA",
      phone: "07471412335",
      email: "rajamuhammadfaysal@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "38",
      name: "Badrunisa Rehman",
      address: "64 Great Western Street, Manchester, M16 7JX",
      phone: "07392042364",
      email: "",
      isActive: "End of Service",
      position: "",
      comment: "",
    },
    {
      _id: "2322",
      name: "Alda -  Reis Rodrigues",
      address: "39 Himley Road M11 4JE, Manchester, M11 4JE",
      phone: "07985376298",
      email: "s_morena25@hotmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "35",
      name: "Zoubida  Sadoun",
      address: "29 Greengate, Hale Barns, Manchester, Cheshire, WA15 0SH",
      phone: "07456010115",
      email: "zoubida_fouad@hotmail.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2458",
      name: "Haritha  Sajikumar",
      address: "13 EVA Street, Rusholme, M14 5NX, Manchester, M14 5NX",
      phone: "07747260086",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2454",
      name: "Huma Saleem",
      address: "263 Great Western Street, Manchester, Lancashire, M14 4LQ",
      phone: "00923315336664",
      email: "86humasaleem@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2481",
      name: "Sobia  Sanaullah",
      address: "25C Victory Street Flat 11, M145AE",
      phone: "07774268404",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2432",
      name: "Omolara Sanni",
      address: "23 Newcastle Street, Manchester, M15 6AH, Manchester, M15 6AH",
      phone: "07867752333",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2438",
      name: "Moiz  Shahab",
      address: "18 Thoresway Road, Longsight, M13 0XN, Manchester, M13 0XN",
      phone: "07301148102",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2385",
      name: "Mariam Sharif",
      address: "15 Victoria Street, Manchester, M11 2LU",
      phone: "07898348925",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2430",
      name: "Amal Sheek",
      address:
        "23 Westman Drive, Manchester, Greater Manchester, M13 9ES, M13 9ES",
      phone: "07760466329",
      email: "amalsheekh2@gmail.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2366",
      name: "Hibaaq Shirwac",
      address: "27 Heyscroft Road, M20 4XN, Manchester, M20 4XN",
      phone: "07859871856",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2518",
      name: "Hanan Sujac",
      address: "7 Lok Fu Garden, Manchester, M8 8JX",
      phone: "07403499025",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2369",
      name: "Zain  Ul Abdin",
      address: "11 Bournelea Avenue, Burnage,, Manchester, M19 1AE",
      phone: "07859080408",
      email: "Zainali356@ymail.com",
      isActive: "Archived",
      position: "",
      comment: "",
    },
    {
      _id: "2382",
      name: "Greeshma Unni",
      address: "117 Heathcote Road, Manchester, M18 7QL",
      phone: "07810243548",
      email: "",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2449",
      name: "Ayodeji Rasheed Yakub",
      address: "Apartment 27, 34 Hulme High Street, Manchester, M15 5JS",
      phone: "07466795747",
      email: "dejyavoo9@aol.com",
      isActive: "Archived",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "48",
      name: "Muna Yusef",
      address: "21 Westcott Court, Lower Moss Lane, Manchester, M15 4HS",
      phone: "07423630242",
      email: "",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "2523",
      name: "Sahar Zeb",
      address: "M16 8BR",
      phone: "07460 924744",
      email: "saharzeb187@gmail.com",
      isActive: "End of Service",
      position: "Care Worker",
      comment: "",
    },
    {
      _id: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      isActive: "",
      position: "",
      comment: "",
    },
  ];

  const allCarers = [...activeCarers, ...pendingCarers, ...archivedCarers];

  const displayedCarers: BaseUser[] = useMemo(() => {
    // Get carers based on active tab
    let carers: BaseUser[] = [];
    switch (activeTab) {
      case CarerTabs.Active:
        carers = activeCarers;
        break;
      case CarerTabs.Pending:
        carers = pendingCarers;
        break;
      case CarerTabs.Archived:
        carers = archivedCarers;
        break;
      case CarerTabs.All:
        carers = allCarers;
        break;
      default:
        carers = [];
    }

    // Apply search filter
    if (!searchQuery) return carers; // if empty, return all

    return carers.filter(
      (carer) =>
        carer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        carer.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        carer.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        carer._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        carer.phone?.includes(searchQuery),
    );
  }, [activeTab, searchQuery]);

  // Modal states
  const [editCarer, setEditCarer] = useState<BaseUser | null>(null);
  const [deleteCarer, setDeleteCarer] = useState<BaseUser | null>(null);
  const [statusChangeCarer, setStatusChangeCarer] = useState<BaseUser | null>(
    null,
  );
  const [addCarerModalOpen, setAddCarerModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const [changePasswordCarer, setChangePasswordCarer] =
    useState<BaseUser | null>(null);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordInputChange = (field: string, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  // Form state for editing & adding
  const [formData, setFormData] = useState<addCarerData>({
    carerId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 20,
    page: 0,
  });

  // --- API and Hooks (Modified to use DUMMY data for listing) ---
  // Mocking useAuth and useAxios here to avoid import issues
  // const useAuth = () => ({ adminToken: "mock-token" });

  // const adminToken = useSelector((state: RootState) => state.auth.token);

  // Simulate API fetching
  const loading = false;
  // const metaData = { total: DUMMY_CARER_DATA.length };

  // Use Axios hooks are kept for modal actions but marked as manual to avoid real calls
  // const { loading: addLoading } = useAxios({
  //   url: "/api/carers",
  //   method: "post",
  //   manual: true,
  //   config: {
  //     headers: { "Content-Type": "multipart/form-data" },
  //     Authorization: adminToken ? `Bearer ${adminToken}` : "",
  //   },
  // });

  // const [addLoading, setAddLoading] = useState(false);

   const addLoading = false;
  // Mock refetch function
  const refetch = () => {
    toast.success("Refetch triggered (using dummy data)");
  };
  // --- END API and Hooks ---

  const handlePasswordChange = async () => {
    const { password, confirmPassword } = passwordForm;
    if (!password || !confirmPassword) {
      toast.error("Both password fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // await changePasswordRequest(); // Mocked
    toast.success(`Password for ${changePasswordCarer?.name} changed (mocked)`);
    setChangePasswordCarer(null);
    refetch();
  };

  const handleAddCarer = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!selectedFile) {
      toast.error("Signature image is required");
      return;
    }

    // Mocked form data submission
    const newCarerData = { ...formData, _id: Date.now().toString() };
    console.log("Adding new carer:", newCarerData);

    // await addCarerRequest({ body: formDataToSend }); // Mocked

    setAddCarerModalOpen(false);
    toast.success(`Carer ${formData.firstName} added (mocked)`);
    refetch();
  };

  const handleSaveEdit = async () => {
    if (!editCarer) return;

    // await editCarerRequest(); // Mocked
    toast.success(`Carer ${editCarer.name} updated (mocked)`);
    setEditCarer(null);
    refetch();
  };

  const handleDeleteCarer = async () => {
    // await deleteCarerRequest(); // Mocked
    toast.success(`Carer ${deleteCarer?.name} deleted (mocked)`);
    setDeleteCarer(null);
    refetch();
  };

  const handleStatusChange = async () => {
    if (!statusChangeCarer) return;

    // await statusChangeRequest(); // Mocked
    const newStatus = !statusChangeCarer.isActive ? "activated" : "deactivated";
    toast.success(`Carer ${statusChangeCarer.name} ${newStatus} (mocked)`);
    setStatusChangeCarer(null);
    refetch();
  };

  // Open edit modal & fill form
  const openEditModal = (carer: BaseUser) => {
    setEditCarer(carer);
    setFormData({
      carerId: carer?.userId || "",
      firstName: carer.name,
      lastName: carer.name,
      phone: String(carer.phone),
      address: carer.address,
      password: "",
      confirmPassword: "",
    });
  };

  // Open add modal and reset form
  const openAddModal = () => {
    setAddCarerModalOpen(true);
    setFormData({
      carerId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    });
    setSelectedFile(null);
  };

  // Handle form changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const avatarColors = [
    "#F44336", // red
    "#E91E63", // pink
    "#9C27B0", // purple
    "#3F51B5", // indigo
    "#2196F3", // blue
    "#03A9F4", // light blue
    "#009688", // teal
    "#4CAF50", // green
    "#FF9800", // orange
    "#FF5722", // deep orange
  ];

  // --- COLUMN DEFINITIONS (Modified for Carer fields) ---
  const columns: GridColDef<BaseUser>[] = useMemo(
    () => [
      {
        field: "avatar",
        headerName: "Avatar",
        width: 70,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          const firstLetter = params.row.name?.split(" ")[0][0]?.toUpperCase();

          // Pick color based on row index or hash of name
          const colorIndex = Number(params.row._id) % avatarColors.length;
          const avatarColor = avatarColors[colorIndex];

          return (
            <Avatar sx={{ bgcolor: avatarColor, color: "#fff" }}>
              {firstLetter}
            </Avatar>
          );
        },
      },
      {
        field: "userId",
        headerName: "Carer Id",
        width: 90,
      },
      {
        field: "firstName",
        headerName: "Name",
        flex: 1.5,
        renderCell: (params) => (
          <div className="text-sm font-medium text-gray-800 dark:text-white">
            {params.row.name}
          </div>
        ),
      },
      {
        field: "address",
        headerName: "Address",
        flex: 2,
        renderCell: (params) => (
          <span className="text-sm text-gray-700 dark:text-gray-400">
            {params.value}
          </span>
        ),
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
        renderCell: (params) => (
          <span className="text-sm text-gray-700 dark:text-gray-400">
            {params.value}
          </span>
        ),
      },
      {
        field: "isActive",
        headerName: "Status",
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.value}
            size="small"
            sx={{ fontSize: "0.7rem", height: "20px" }}
            color={params.value == "Activated" ? "success" : "error"}
            onClick={() => setStatusChangeCarer(params.row)}
          />
        ),
      },
      {
        field: "details",
        headerName: "Details",
        width: 80,
        renderCell: () => (
          <IconButton size="small" color="success">
            <List />
          </IconButton>
        ),
      },
      {
        field: "schedule",
        headerName: "Schedule",
        width: 80,
        renderCell: (params) => (
          <IconButton size="small" color="success" className="relative">
            <p
              className={
                params.value == "N"
                  ? "text-white bg-red-400 w-4 h-4 p-0 rounded-full flex justify-center items-center text-[10px] absolute top-0 right-0"
                  : "text-white bg-green-400 w-4 h-4 p-0 rounded-full flex justify-center items-center text-[10px] absolute top-0 right-0"
              }
            >
              {params.value}
            </p>
            <Calendar />
          </IconButton>
        ),
      },
      {
        field: "position",
        headerName: "Position",
        width: 120,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 160,
        renderCell: (params) => (
          <Box display="flex" gap={1}>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                size="small"
                onClick={() => openEditModal(params.row)}
              >
                <Edit2 size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={() => setDeleteCarer(params.row)}
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change Password">
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  setChangePasswordCarer(params.row);
                  setPasswordForm({ password: "", confirmPassword: "" });
                }}
              >
                <Key size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        sortable: false,
        filterable: false,
      },
    ],
    [displayedCarers],
  );

  const handleReinstate = (carer: BaseUser) => {
    // Example: move the archived carer back to active
    toast.success(`${carer.name} reinstated successfully!`);
    // Here you would normally update the API / state
  };

  const archivedColumns: GridColDef<BaseUser>[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const firstLetter = params.row.name?.split(" ")[0][0]?.toUpperCase();

        // Pick color based on row index or hash of name
        const colorIndex = Number(params.row._id) % avatarColors.length;
        const avatarColor = avatarColors[colorIndex];

        return (
          <Avatar sx={{ bgcolor: avatarColor, color: "#fff" }}>
            {firstLetter}
          </Avatar>
        );
      },
    },
    {
      field: "_id",
      headerName: "No.",
      width: 80,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "email",
      headerName: "E-Mail",
      width: 180,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="default" />
      ),
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
    },
    {
      field: "details",
      headerName: "Comment",
      width: 200,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "reinstate",
      headerName: "Reinstate",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="primary"
          size="md"
          onClick={() => handleReinstate(params.row)}
          className="h-10 bg-green-600"
        >
          Change Status
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* Title + Search + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Manage Carers
        </h2>

        <div className="flex gap-3 items-center">
          <div>
            <Input
              name="search"
              type="search"
              placeholder="Search carers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="primary" size="sm" onClick={openAddModal}>
            + Add New Carer
          </Button>
        </div>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Active Carers" />
          <Tab label="Pending Carers" />
          <Tab label="Archived Carers" />
          <Tab label="All Carers" />
        </Tabs>
      </Box>

      <DataTable
        rows={displayedCarers}
        rowCount={displayedCarers.length}
        pagination
        paginationMode="client" // Using customer mode since data is filtered locally
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => setPaginationModel(model)}
        loading={loading}
        columns={activeTab === CarerTabs.Archived ? archivedColumns : columns}
        getRowId={(row: any) => row._id}
      />

      {/* Edit Carer Modal (Fields changed from Carer to Carer) */}
      <CommonModal
        open={!!editCarer}
        onClose={() => setEditCarer(null)}
        title="Edit Carer"
        width="medium"
      >
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>First Name</Label>
              <Input
                value={formData.firstName}
                onChange={(e: any) =>
                  handleInputChange("firstName", e.target.value)
                }
                placeholder="First Name"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={formData.lastName}
                onChange={(e: any) =>
                  handleInputChange("lastName", e.target.value)
                }
                placeholder="Last Name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Input
                  type="text"
                  className="pl-[62px]"
                  value={formData.email}
                  onChange={(e: any) =>
                    handleInputChange("email", e.target.value)
                  }
                  placeholder="Email"
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon className="size-6" />
                </span>
              </div>
            </div>
            <div>
              <Label>Mobile</Label>
              <PhoneInput
                selectPosition="start"
                countries={countries}
                placeholder="+1 (555) 000-0000"
                onChange={(val: any) => handleInputChange("phone", val)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-6">
            <div className="w-full">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e: any) =>
                  handleInputChange("address", e.target.value)
                }
                placeholder="Address"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditCarer(null)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
          </div>
        </div>
      </CommonModal>

      {/* Add New Carer Modal (Fields changed from Carer to Carer) */}
      <CommonModal
        open={addCarerModalOpen}
        onClose={() => setAddCarerModalOpen(false)}
        title="Add New Carer"
        width="medium"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <Label>First Name</Label>
            <Input
              value={formData.firstName}
              onChange={(e: any) =>
                handleInputChange("firstName", e.target.value)
              }
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div>
            <Label>Last Name</Label>
            <Input
              value={formData.lastName}
              onChange={(e: any) =>
                handleInputChange("lastName", e.target.value)
              }
              placeholder="Last Name"
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Input
                type="text"
                className="pl-[62px]"
                value={formData.email}
                onChange={(e: any) =>
                  handleInputChange("email", e.target.value)
                }
                placeholder="Email"
              />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <EnvelopeIcon className="size-6" />
              </span>
            </div>
          </div>

          {/* Mobile */}
          <div>
            <Label>Mobile</Label>
            <PhoneInput
              selectPosition="start"
              countries={countries}
              placeholder="+1 (555) 000-0000"
              onChange={(val) => handleInputChange("phone", val)}
            />
          </div>

          {/* Address */}
          <div>
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e: any) =>
                handleInputChange("address", e.target.value)
              }
              placeholder="Address"
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e: any) =>
                handleInputChange("password", e.target.value)
              }
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e: any) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm Password"
            />
          </div>

          <div className="col-span-2 mt-4">
            <Label>Signature Image</Label>
            <DropzoneComponent
              onDrop={handleDrop}
              accept={{
                "image/*": [".jpg", ".jpeg", ".png"],
              }}
              label="Upload Signature Image"
              previewFile={selectedFile}
            />
          </div>

          {/* Action Buttons (span 2 columns) */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            {addLoading ? (
              "Adding..."
            ) : (
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAddCarerModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={addLoading}
                  variant="primary"
                  size="sm"
                  onClick={handleAddCarer}
                >
                  Add Carer
                </Button>
              </div>
            )}
          </div>
        </div>
      </CommonModal>

      {/* change password modal (Fields changed from Carer to Carer) */}
      <CommonModal
        open={!!changePasswordCarer}
        onClose={() => setChangePasswordCarer(null)}
        title={`Change Password for ${changePasswordCarer?.name}`}
        width="small"
      >
        <div className="space-y-4">
          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              value={passwordForm.password}
              onChange={(e) =>
                handlePasswordInputChange("password", e.target.value)
              }
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                handlePasswordInputChange("confirmPassword", e.target.value)
              }
              placeholder="Re-enter new password"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChangePasswordCarer(null)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handlePasswordChange}>
              Save
            </Button>
          </div>
        </div>
      </CommonModal>

      {/* Confirm Delete Modal (Fields changed from Carer to Carer) */}
      <ConfirmModal
        open={!!deleteCarer}
        onClose={() => setDeleteCarer(null)}
        onConfirm={handleDeleteCarer}
        title="Confirm Delete Carer"
        description={`Are you sure you want to delete carer ${deleteCarer?.name}?`}
      />

      <ConfirmModal
        open={!!statusChangeCarer}
        onClose={() => setStatusChangeCarer(null)}
        onConfirm={handleStatusChange}
        title="Confirm Status Change"
        description={
          <>
            Are you sure you want to{" "}
            <strong>
              {statusChangeCarer?.isActive ? "deactivate" : "activate"}
            </strong>{" "}
            carer <strong>{statusChangeCarer?.name}</strong>?
          </>
        }
      />
    </div>
  );
}

import logger from "../../src/util/logger";
import { DbService } from "../../src/services/db.service";
import {ItineraryResource} from "../../src/resources/itinerary.resource";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();
const itineraryResource: ItineraryResource = new ItineraryResource();



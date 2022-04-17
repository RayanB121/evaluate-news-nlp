import { checkForURL } from "../src/client";
import 'regenerator-runtime/runtime'
describe("Testing the input validation", () => {
    test("Testing the checkForURL() function", () => {
           expect(checkForURL("https://jamesclear.com/saying-no"))
           .toBeTruthy();
           
})});
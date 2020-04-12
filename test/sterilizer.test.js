import { sterilizer } from "../src/sterilizer.js";

describe("sterilizer testing", () => {
    let str = ">a b\nc@#";

    test("chain", () => {
        expect(
            sterilizer("abc~!@###-$", true).kill("-#").remove("a").toString()
        ).toEqual("bc~!@$");
    });

    test("kill all symbols", () => {
        expect(sterilizer(str).kill()).toEqual("a b\nc");
    });

    test("kill custom symbols", () => {
        expect(sterilizer(str).kill("@#")).toEqual(">a b\nc");
    });

    test("live custom symbols", () => {
        expect(sterilizer(str).live("@")).toEqual("a b\nc@");
    });

    test("live safe symbols", () => {
        expect(sterilizer(str).safe()).toEqual("a b\nc@");
    });

    test("remove htmlspecialchars", () => {
        expect(sterilizer(str).removeHSC()).toEqual("a b\nc@#");
    });

    test("remove urlspecialchars", () => {
        expect(sterilizer(str).removeURL()).toEqual(">a b\nc@");
    });

    test("remove all the space", () => {
        expect(sterilizer(str).removeSpace()).toEqual(">abc@#");
    });

    test("remove specified charaters", () => {
        expect(sterilizer(str).remove("a")).toEqual("> b\nc@#");
        expect(sterilizer(str).remove("a", "x")).toEqual(">x b\nc@#");
    });

    test("remove all the HTML tags", () => {
        expect(
            sterilizer(
                '<a href="xx"><img src="" />picture</a>hello<hr/>'
            ).removeHTMLtag()
        ).toEqual("picturehello");
    });
});

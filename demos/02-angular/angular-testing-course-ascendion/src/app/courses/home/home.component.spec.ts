import {
    ComponentFixture,
    fakeAsync,
    flush,
    flushMicrotasks,
    TestBed,
    tick,
} from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { DebugElement } from "@angular/core";

import { HomeComponent } from "./home.component";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { CoursesService } from "../services/courses.service";
import { HttpClient } from "@angular/common/http";
import { COURSES } from "../../../../server/db-data";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { click } from "../common/test-utils";

describe("HomeComponent", () => {
    const courses = setupCourses();
    const beginnerCourses = courses.filter((c) => c.category === "BEGINNER");
    const advancedCourses = courses.filter((c) => c.category === "ADVANCED");

    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
        "findAllCourses",
    ]);

    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let fixtureDE: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CoursesModule, NoopAnimationsModule],

            providers: [
                // When anyone (in our case HomeComponent asks for CoursesService service, give the coursesServiceSpy object
                {
                    provide: CoursesService,
                    useValue: coursesServiceSpy,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixtureDE = fixture.debugElement;
    });

    it("should create the component", () => {
        // smoke test - component is rendered fine
        expect(component).toBeTruthy();
    });

    it("should display only beginner courses", () => {
        // coursesServiceSpy.findAllCourses spy should return only beginner courses
        // of() from 'rxjs' creates an Observable object that gets the required data (in our case it is the beginner course)
        coursesServiceSpy.findAllCourses.and.returnValue(of(beginnerCourses));

        // change detection will happen - ngOnInit() will execute and the DOM will get populated
        fixture.detectChanges();

        const tabs = fixtureDE.queryAll(By.css(".mat-mdc-tab"));

        console.log(tabs);

        expect(tabs.length).toBe(
            1,
            "unexpected number of tabs found - only 1 tab should be shown"
        );

        // verify that the tab is actually the Beginners tab
        expect(tabs[0].nativeElement.textContent).toBe("Beginners");
    });

    it("should display only advanced courses", () => {
        pending();
        // your code...
    });

    it("should display both tabs and ", () => {
        coursesServiceSpy.findAllCourses.and.returnValue(of(courses));

        fixture.detectChanges();

        const tabs = fixtureDE.queryAll(By.css(".mat-mdc-tab"));
        expect(tabs.length).toBe(
            2,
            "unexpected number of tabs found - 2 tabs should be shown"
        );

        // if `courses` is passed from service, then the first tab (Beginner tab) must have 9 cards within it
        // your code...
        const beginnerCards = fixtureDE.queryAll(
            By.css("mat-tab-body:nth-child(1) mat-card")
        );

        expect(beginnerCards.length).toBe(
            9,
            "unexpected number of beginner course cards"
        );

        // this does not work for advanced cards as the cards are populated in the body only when the Advanced tab is clicked
        // const advancedCards = fixtureDE.queryAll(
        //     By.css("mat-tab-body:nth-child(2) mat-card")
        // );

        // expect(advancedCards.length).toBe(
        //     3,
        //     "unexpected number of advanced course cards"
        // );
    });

    it("should display advanced courses when tab clicked", (done) => {
        coursesServiceSpy.findAllCourses.and.returnValue(of(courses));

        fixture.detectChanges();

        const tabs = fixtureDE.queryAll(By.css(".mat-mdc-tab"));

        click(tabs[1]); // or click(tabs[1].nativeElement)

        fixture.detectChanges();

        // The animation that occurs to populate the cards in the second mat-tab-body happens asynchronously. So the check for cards must be done after a delay.
        setTimeout(() => {
            console.log("inside function passed to setTimeout");

            const advancedCards = fixtureDE.queryAll(
                By.css("mat-tab-body:nth-child(2) mat-card")
            );

            expect(advancedCards.length).toBe(
                3,
                "unexpected number of advanced course cards"
            );

            // signal Jasmine that test is now over by calling done
            done();
        }, 1000);

        console.log("end of test");
    });

    // when you click on Advanced '.mat-mdc-tab' and then again on Beginners tab, yoou should again find 9 mat-card elements in the first mat-tab-body
    it("should show the right number of cards when Beginners tab is clicked again", (done) => {
        coursesServiceSpy.findAllCourses.and.returnValue(of(courses));

        fixture.detectChanges();

        const tabs = fixtureDE.queryAll(By.css(".mat-mdc-tab"));

        click(tabs[1]); // or click(tabs[1].nativeElement)

        fixture.detectChanges();

        click(tabs[0]); // or click(tabs[0].nativeElement)

        fixture.detectChanges();

        setTimeout(() => {
            const cards = fixtureDE.queryAll(
                By.css("mat-tab-body:nth-child(1) mat-card")
            );

            expect(cards.length).toBe(
                9,
                "unexpected number of beginner course cards"
            );

            done();
        }, 1000);
    });

    it("should display advanced courses when tab clicked", fakeAsync(() => {
        coursesServiceSpy.findAllCourses.and.returnValue(of(courses));

        fixture.detectChanges();

        const tabs = fixtureDE.queryAll(By.css(".mat-mdc-tab"));

        click(tabs[1]); // or click(tabs[1].nativeElement)

        fixture.detectChanges();

        // The animation that occurs to populate the cards in the second mat-tab-body happens asynchronously. So the check for cards must be done after a delay.

        // simulate the passage of time
        // tick(1000);
        flush(); // execute any tasks from the event queue that are waiting to be executed (eg. animation tasks added using requestAnimationFrame())

        const advancedCards = fixtureDE.queryAll(
            By.css("mat-tab-body:nth-child(2) mat-card")
        );

        expect(advancedCards.length).toBe(
            3,
            "unexpected number of advanced course cards"
        );
    }));

    // EXPLORE: Instead of fakeAsync() and flush(), you can also use waitForAsync() and fixture.whenStable() which is promise-based
});

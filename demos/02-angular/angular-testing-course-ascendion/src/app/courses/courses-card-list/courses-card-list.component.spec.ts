import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { CoursesModule } from "../courses.module";
import { COURSES } from "../../../../server/db-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { sortCoursesBySeqNo } from "../home/sort-course-by-seq";
import { Course } from "../model/course";
import { setupCourses } from "../common/setup-test-data";

describe("CoursesCardListComponent", () => {
    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let fixtureDE: DebugElement;

    beforeEach(async () => {
        // compileComponents() is asynchronous. So we should wait for it to complete its task of compiling the component (putting together HTML, CSS< TS and creating the View that renders to the DOM)
        await TestBed.configureTestingModule({
            imports: [CoursesModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        // the debug element gives access to the component's DOM
        fixtureDE = fixture.debugElement;
    });

    it("should create the component", () => {
        // smoke test for the component (the component renders fine)
        expect(component).toBeTruthy();
    });

    it("should display the course list", () => {
        const courses = setupCourses();

        // we are providing the @Input data in the absence of a parent component
        component.courses = courses;

        // run change detection - a variable has changed, and we must inform Angular, so that it updates the DOM
        fixture.detectChanges();

        // we get an "array of matching debug elements" - titles (debug element is a wrapper over DOM node)
        const titles = fixtureDE.queryAll(By.css("mat-card-title"));

        // we are using [attribute] seelctor here as mat-card-image is an attribute
        const images = fixtureDE.queryAll(By.css("[mat-card-image]"));

        for (let i = 0; i < titles.length; ++i) {
            // titles[i].nativeElement -> gets the DOM node wrapped by the debug element
            expect(titles[i].nativeElement.textContent).toBe(
                courses[i].titles.description,
                "description not appearing as expected"
            );
        }

        // there should be at least 1 image
        expect(images.length).not.toBe(0);

        for (let i = 0; i < images.length; ++i) {
            expect(images[i].nativeElement.src).toBe(
                courses[i].iconUrl,
                "images not appearing as expected"
            );
        }
    });

    it("should display the first course", () => {
        pending();
    });
});

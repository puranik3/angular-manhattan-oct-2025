import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
    HttpTestingController,
    provideHttpClientTesting,
} from "@angular/common/http/testing";
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";

import { CoursesService } from "./courses.service";
// Tests:
// should retrieve all courses
// Concepts: Set up TestBed with HttpTestingController and providers, test for "" with use of HttpTestingController#expectOne(), TestRequest#request, TestRequest#flush()

describe("Courses service", () => {
    let cs: CoursesService;
    let httpTestingController: HttpTestingController;

    // setup
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CoursesService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        cs = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    // teardown
    // executes once after each test
    afterEach(() => {
        // makes sure that the test made no call to the backend except the ones we expect
        httpTestingController.verify();
    });

    it("should retrieve all courses", () => {
        cs.findAllCourses().subscribe({
            next: (courses) => {
                expect(courses.length).toBe(12);
            },
        });

        // this line confirms you have made a call to the right backend URL - else the test will fail here
        const reqWrapper = httpTestingController.expectOne("/api/courses");

        // this line confirms we made a GET request
        expect(reqWrapper.request.method).toMatch(/GET/i);

        // what the mock backend should return
        // the call to the mock backend happens when we call flush, and the mock backend returns this data
        reqWrapper.flush({
            payload: Object.values(COURSES),
        });
    });

    it("should retrieve course by its id", () => {
        const course = COURSES[2];

        cs.findCourseById(2).subscribe({
            next: (courseFromBackend) => {
                expect(courseFromBackend).toEqual(course);
            },
        });

        // this line confirms you have made a call to the right backend URL - else the test will fail here
        const reqWrapper = httpTestingController.expectOne("/api/courses/2");

        // this line confirms we made a GET request
        expect(reqWrapper.request.method).toMatch(/GET/i);

        // what the mock backend should return
        // the call to the mock backend happens when we call flush, and the mock backend returns this data
        reqWrapper.flush(course);
    });

    it("should save the course data", () => {
        const changes: Partial<Course> = {
            titles: {
                description: "This is an angular testing course",
            },
        };

        cs.saveCourse(2, changes).subscribe({
            next: (updatedCourse) => {
                expect(updatedCourse.titles.description).toBe(
                    changes.titles.description
                );
            },
        });

        const reqWrapper = httpTestingController.expectOne(
            (req) => req.method === "PUT"
        );
        // expect(reqWrapper.request.method).toBe("PUT");
        expect(reqWrapper.request.url).toBe("/api/courses/2");

        reqWrapper.flush({
            ...COURSES[2],
            ...changes,
        });
    });

    // Tests: should find a list of lessons
    // Concepts: matching request based on HTTP request attributes like URL, params etc., testing query parameters passed during the HTTP request
    // Sample request: http://localhost:8000/api/lessons?courseId=12&sortOrder=asc&pageNumber=0&pageSize=10
    it("should find a list of lessons", () => {
        cs.findLessons(12, "Angular").subscribe({
            next: (lessons) => {
                expect(lessons[0].description).toBe(
                    "Angular Testing Course - Helicopter View"
                );
            },
        });

        const reqWrapper = httpTestingController.expectOne(
            (req) => req.url === "/api/lessons"
        );
        expect(reqWrapper.request.method).toMatch(/GET/i);

        // test the params
        expect(reqWrapper.request.params.get("courseId")).toBe("12");
        expect(reqWrapper.request.params.get("filter")).toBe("Angular");
        expect(reqWrapper.request.params.get("sortOrder")).toBe("asc");
        expect(reqWrapper.request.params.get("pageNumber")).toBe("0");
        expect(reqWrapper.request.params.get("pageSize")).toBe("3");

        // flush the request-response
        // remember to set payload to array of lessons for course
        reqWrapper.flush({
            payload: findLessonsForCourse(12).slice(0, 3),
        });
    });
});

import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { Course } from "../model/course";
import { Observable, Subscription } from "rxjs";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";
import { sortCoursesBySeqNo } from "./sort-course-by-seq";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    beginnerCourses: Course[];

    subscription: Subscription;

    constructor(private coursesService: CoursesService) {}

    ngOnChanges(simpleChanges: SimpleChanges) {}

    ngOnInit() {
        this.reloadCourses();
    }

    reloadCourses() {
        const courses$ = this.coursesService.findAllCourses();

        this.beginnerCourses$ = this.filterByCategory(courses$, "BEGINNER");

        // this.subscription = this.beginnerCourses$.subscribe({
        //     next: (courses) => {
        //         this.beginnerCourses = courses;
        //     },
        // });

        this.advancedCourses$ = this.filterByCategory(courses$, "ADVANCED");
    }

    filterByCategory(courses$: Observable<Course[]>, category: string) {
        return courses$.pipe(
            map((courses) =>
                courses
                    .filter((course) => course.category === category)
                    .sort(sortCoursesBySeqNo)
            )
        );
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }
}

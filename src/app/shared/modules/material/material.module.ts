import { NgModule, Provider } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    exports: [
        MatBadgeModule,
        MatInputModule,
        MatFormFieldModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTableModule,
        MatStepperModule,
        TextFieldModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatBottomSheetModule,
        MatTooltipModule,
        MatCardModule,
        MatDialogModule,
        MatRadioModule,
        ScrollingModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatProgressBarModule
    ],
    providers: [
    ]
})
export class MaterialModule {
    static forServices(): Provider[] {
        return [];
    }
}


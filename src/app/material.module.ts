import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatAccordionDisplayMode,
         MatCardModule, MatFormFieldModule,  MatInputModule } from '@angular/material';

@NgModule({
  imports: [ FormsModule, ReactiveFormsModule, MatButtonModule, MatToolbarModule, MatIconModule,
            MatCardModule, MatFormFieldModule,  MatInputModule  ],
  exports: [ MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule,  MatInputModule  ],
  declarations: []
})
export class MaterialModule { }



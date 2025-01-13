import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Technology } from '../../../models/testing/technology';
import { Profile } from '../../../models/testing/profile';
import { UserService } from '../../../services/testing/user.service';
import { User } from '../../../models/testing/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [],
  templateUrl: './select-test.component.html',
  styleUrl: './select-test.component.css'
})
export class SelectTestComponent implements OnInit {

	isValidFormSubmitted = false;
	allProfiles: Profile[] = [];
	allTechnologies: Technology[] = [];
  	private formBuilder = inject(FormBuilder);
  	private userService = inject(UserService);
  	userForm = this.formBuilder.group({
		profile: [null as Profile | null, [Validators.required]],
    	userName: ['', [Validators.required]],
		technologies: this.formBuilder.array([], [Validators.required])
  	});

	constructor() { }
	ngOnInit(): void {
		this.allProfiles = this.userService.getPofiles();
		this.allTechnologies = this.userService.getTechnologies();
		this.setFormControlValues();
	}
	get profile() {
		return this.userForm.get('profile');
	}
	get userName() {
		return this.userForm.get('userName');
	}
	get technologies() {
		return this.userForm.get('technologies');
	}
	onFormSubmit() {
		this.isValidFormSubmitted = false;
		if (this.userForm.valid) {
			this.isValidFormSubmitted = true;
		} else {
			return;
		}
		let formValue = this.userForm.value;
		let newUser: User = {
			profile: formValue.profile ? (formValue.profile as Profile) : ({} as Profile),
			userName: formValue.userName as string,
			technologies: formValue.technologies ? (formValue.technologies as Technology[]) : ({} as Technology[])
		};
		this.userService.createUser(newUser);
		this.resetForm(this.userForm);
	}
	resetForm(form: FormGroup) {
		form.reset();
	}
	setDefaultValues() {
		let user = new User();
		user.userName = "Narendra Modi";
		user.profile = this.allProfiles[2];
		user.technologies = [
			this.allTechnologies[1],
			this.allTechnologies[3]
		];
		this.userForm.setValue({
			profile: user.profile,
			userName: user.userName,
			technologies: user.technologies || []
		});
	}
	setFormControlValues() {
		this.userForm.get('profile')?.setValue(this.allProfiles.find(profile => profile.prName === "Developer") || null);
	}
	onProfileChange() {
		let profile: Profile | null = this.profile?.value ?? null;
		if (profile) {
			if (profile) {
				console.log('Profile Changed: ' + (profile ? profile.prName : 'null'));
			}
		}
		console.log('Profile Changed: ' + (profile ? profile.prName : 'null'));
	}
	compareTech(t1: Technology, t2: Technology): boolean {
		console.log(t1.techId + '-' + t2.techId);
		return t1 && t2 ? t1.techId === t2.techId : t1 === t2;
	}

}

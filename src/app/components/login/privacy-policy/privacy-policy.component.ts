import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {ChannelService} from "../../../shared/services/channel.service";


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone: true
})

export class PrivacyPolicyComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > this.cs.innerWidth;

  constructor(public location: Location, private cs: ChannelService) {}
}

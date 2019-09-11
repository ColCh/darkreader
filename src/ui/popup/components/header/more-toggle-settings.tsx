import {m} from 'malevic';
import {CheckBox, TimeRangePicker, Button} from '../../../controls';
import {getLocalMessage} from '../../../../utils/locales';
import {ExtWrapper} from '../../../../definitions';

type MoreToggleSettingsProps = ExtWrapper & {
    isExpanded: boolean;
    onClose: () => void;
};

export default function MoreToggleSettings({data, actions, isExpanded, onClose}: MoreToggleSettingsProps) {
    const isSystemAutomation = data.settings.automation === 'system';
    return (
        <div
            class={{
                'header__app-toggle__more-settings': true,
                'header__app-toggle__more-settings--expanded': isExpanded,
            }}
        >
            <div class="header__app-toggle__more-settings__top">
                <span class="header__app-toggle__more-settings__top__text">{getLocalMessage('automation')}</span>
                <span class="header__app-toggle__more-settings__top__close" role="button" onclick={onClose}>✕</span>
            </div>
            <div class="header__app-toggle__more-settings__content">
                <div class="header__app-toggle__more-settings__line">
                    <CheckBox
                        checked={data.settings.automation === 'time'}
                        onchange={(e) => actions.changeSettings({automation: e.target.checked ? 'time' : ''})}
                    />
                    <TimeRangePicker
                        startTime={data.settings.time.activation}
                        endTime={data.settings.time.deactivation}
                        onChange={([start, end]) => actions.changeSettings({time: {activation: start, deactivation: end}})}
                    />
                </div>
                <p class="header__app-toggle__more-settings__description">
                    {getLocalMessage('set_active_hours')}
                </p>
                <div class={[
                    'header__app-toggle__more-settings__line',
                    'header__app-toggle__more-settings__system-dark-mode',
                ]}
                >
                    <CheckBox
                        class="header__app-toggle__more-settings__system-dark-mode__checkbox"
                        checked={isSystemAutomation}
                        onchange={(e) => actions.changeSettings({automation: e.target.checked ? 'system' : ''})}
                    />
                    <Button
                        class={{
                            'header__app-toggle__more-settings__system-dark-mode__button': true,
                            'header__app-toggle__more-settings__system-dark-mode__button--active': isSystemAutomation,
                        }}
                        onclick={() => actions.changeSettings({automation: isSystemAutomation ? '' : 'system'})}
                    >{getLocalMessage('system_dark_mode')}</Button>
                </div>
                <p class="header__app-toggle__more-settings__description">
                    {getLocalMessage('system_dark_mode_description')}
                </p>
            </div>
        </div>
    );
}

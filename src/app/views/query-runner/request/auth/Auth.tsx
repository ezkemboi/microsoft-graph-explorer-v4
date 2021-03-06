import { IconButton, IIconProps, Label, styled } from 'office-ui-fabric-react';
import React from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { componentNames, eventTypes, telemetry } from '../../../../../telemetry';
import { translateMessage } from '../../../../utils/translate-messages';
import { classNames } from '../../../classnames';
import { genericCopy } from '../../../common/copy';
import { convertVhToPx } from '../../../common/dimensions-adjustment';
import { authStyles } from './Auth.styles';


export function Auth(props: any) {
  const { authToken: accessToken, dimensions: { request: { height } } } = useSelector((state: any) => state);
  const requestHeight = convertVhToPx(height, 60);

  const handleCopy = async () => {
    await genericCopy(accessToken);
    trackCopyEvent();
  };

  const classes = classNames(props);
  const copyIcon: IIconProps = {
    iconName: 'copy'
  };

  const tokenDetailsIcon: IIconProps = {
    iconName: 'code'
  };

  return (<div className={classes.auth} style={{ height: requestHeight }}>
    {accessToken ?
      <div>
        <div className={classes.accessTokenContainer}>
          <Label className={classes.accessTokenLabel}><FormattedMessage id='Access Token' /></Label>
          <IconButton onClick={handleCopy} iconProps={copyIcon} title='Copy' ariaLabel='Copy' />
          <IconButton iconProps={tokenDetailsIcon}
            title={translateMessage('Get token details (Powered by jwt.ms)')}
            ariaLabel={translateMessage('Get token details (Powered by jwt.ms)')}
            href={`https://jwt.ms#access_token=${accessToken}`}
            target='_blank' />
        </div>
        <Label className={classes.accessToken} >{accessToken}</Label>
      </div>
      :
      <Label className={classes.emptyStateLabel}>
        <FormattedMessage id='Sign In to see your access token.' />
      </Label>
    }
  </div>);
}

function trackCopyEvent() {
  telemetry.trackEvent(
    eventTypes.BUTTON_CLICK_EVENT,
    {
      ComponentName: componentNames.ACCESS_TOKEN_COPY_BUTTON
    });
}

const trackedComponent = telemetry.trackReactComponent(Auth, componentNames.ACCESS_TOKEN_TAB);
// @ts-ignore
export default styled(trackedComponent, authStyles);
import { SupportedExportFormats } from '@/types/export';
import { PluginKey } from '@/types/plugin';
import { IconFileExport, IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { Import } from '../Settings/Import';
import { Key } from '../Settings/Key';
import { SidebarButton } from '../Sidebar/SidebarButton';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import { LoginModal } from '../Login/LoginModal';
import { getAntiCSRFToken } from "@blitzjs/auth"
import { BlitzPage } from '@blitzjs/next';
import { useSession } from "@blitzjs/auth"


interface Props {
  lightMode: 'light' | 'dark';
  apiKey: string;
  serverSideApiKeyIsSet: boolean;
  pluginKeys: PluginKey[];
  serverSidePluginKeysSet: boolean;
  conversationsCount: number;
  onToggleLightMode: (mode: 'light' | 'dark') => void;
  onApiKeyChange: (apiKey: string) => void;
  onClearConversations: () => void;
  onExportConversations: () => void;
  onImportConversations: (data: SupportedExportFormats) => void;
  onPluginKeyChange: (pluginKey: PluginKey) => void;
  onClearPluginKey: (pluginKey: PluginKey) => void;
}

export const ChatbarSettings: BlitzPage<Props> = ({
  lightMode,
  apiKey,
  serverSideApiKeyIsSet,
  pluginKeys,
  serverSidePluginKeysSet,
  conversationsCount,
  onToggleLightMode,
  onApiKeyChange,
  onClearConversations,
  onExportConversations,
  onImportConversations,
  onPluginKeyChange,
  onClearPluginKey,
}) => {
  const { t } = useTranslation('sidebar');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const session = useSession()

  const onSubmitSignup = async (email: string, password: string) => {
    const antiCSRFToken = getAntiCSRFToken()
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({ email, password }),
    })
    if (res.status === 200) {
      setShowLoginModal(false)
    }
  }

  const onSubmitLogin = async (email: string, password: string) => {
    const antiCSRFToken = getAntiCSRFToken()
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({ email, password }),
    })
    if (res.status === 200) {
      setShowLoginModal(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversationsCount > 0 ? (
        <ClearConversations onClearConversations={onClearConversations} />
      ) : null}

      <Import onImport={onImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => onExportConversations()}
      />

      <SidebarButton
        text={lightMode === 'light' ? t('Dark mode') : t('Light mode')}
        icon={
          lightMode === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />
        }
        onClick={() =>
          onToggleLightMode(lightMode === 'light' ? 'dark' : 'light')
        }
      />

      {!(serverSideApiKeyIsSet) ? (
        <Key apiKey={apiKey} onApiKeyChange={onApiKeyChange} />
      ) : null}

      {!(serverSidePluginKeysSet) ? (
        <PluginKeys
          pluginKeys={pluginKeys}
          onPluginKeyChange={onPluginKeyChange}
          onClearPluginKey={onClearPluginKey}
        />
      ) : null}

      {
        session.email ? <p>{session.email}</p> : (
        <SidebarButton
          text={'Login'}
          icon={<IconFileExport size={18} />}
          onClick={() => setShowLoginModal(true)}
        />
        )
      }
      {showLoginModal ? (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSubmitSignup={onSubmitSignup}
          onSubmitLogin={onSubmitLogin}
        />
      ) : null}
    </div>
  );
};

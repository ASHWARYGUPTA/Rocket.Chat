import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { settings } from '../../app/settings/client';
import { MessageAction } from '../../app/ui-utils/client';
import { imperativeModal } from '../lib/imperativeModal';
import ReadReceiptsModal from '../views/room/modals/ReadReceiptsModal';

Meteor.startup(() => {
	Tracker.autorun(() => {
		const enabled = settings.get('Message_Read_Receipt_Enabled') && settings.get('Message_Read_Receipt_Store_Users');

		if (!enabled) {
			return MessageAction.removeButton('receipt-detail');
		}

		MessageAction.addButton({
			id: 'receipt-detail',
			icon: 'check-double',
			label: 'Read_Receipts',
			context: ['starred', 'message', 'message-mobile', 'threads', 'videoconf', 'videoconf-threads'],
			type: 'duplication',
			action(_, { message }) {
				imperativeModal.open({
					component: ReadReceiptsModal,
					props: { messageId: message._id, onClose: imperativeModal.close },
				});
			},
			order: 10,
			group: 'menu',
		});
	});
});

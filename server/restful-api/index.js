import { Router } from 'express';
import Users from './users'
import Msgs from './msgs'
import Qiniu from './qiniu'

export default function() {
	var api = Router();

	// mount the facets resource
	api.use('/users', Users);
    api.use('/msgs', Msgs)
    api.use('/qiniu',Qiniu)

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	return api;
}

import * as RealApiCalls from './real';
import * as FakeApiCalls from './fake';

export default process.env.FAKE_API ? FakeApiCalls.default : RealApiCalls.default;

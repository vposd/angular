/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as path from 'path';
import * as shx from 'shelljs';

describe('Zone.js npm_package', () => {
  beforeEach(
      () => {shx.cd(
          path.dirname(require.resolve('angular/packages/zone.js/npm_package/package.json')))});
  describe('misc root files', () => {
    describe('README.md', () => {
      it('should have a README.md file with basic info', () => {
        expect(shx.cat('README.md')).toContain(`Zone`);
      });
    });
  });

  describe('primary entry-point', () => {
    const packageJson = 'package.json';

    it('should have a package.json file', () => {
      expect(shx.grep('"name":', packageJson)).toContain(`zone.js`);
    });

    it('should contain correct version number with the PLACEHOLDER string replaced', () => {
      expect(shx.grep('"version":', packageJson)).toMatch(/\d+\.\d+\.\d+(?!-PLACEHOLDER)/);
    });

    it('should contain module resolution mappings', () => {
      expect(shx.grep('"main":', packageJson)).toContain(`dist/zone-node.js`);
    });
  });

  describe('check dist folder', () => {
    beforeEach(() => {
      shx.cd('./dist');
    });
    afterEach(() => {
      shx.cd('../');
    });
    describe('typescript support', () => {
      it('should have an zone.js.d.ts file', () => {
        expect(shx.cat('zone.js.d.ts')).toContain('declare const');
      });

      it('should have an zone.api.extensions.ts file', () => {
        expect(shx.cat('zone.api.extensions.ts')).toContain('EventTarget');
      });

      it('should have an zone.configurations.api.ts file', () => {
        expect(shx.cat('zone.configurations.api.ts')).toContain('ZoneGlobalConfigurations');
      });
    });

    describe('closure', () => {
      it('should contain externs', () => {
        expect(shx.cat('zone_externs.js')).toContain('Externs for zone.js');
      });
    });

    describe('rxjs patch', () => {
      it('should not contain rxjs source', () => {
        expect(shx.cat('zone-patch-rxjs.js'))
            .not.toContain('_enable_super_gross_mode_that_will_cause_bad_things');
      });
    });

    describe('es5', () => {
      it('zone.js(es5) should not contain es6 spread code', () => {
        expect(shx.cat('zone.js')).not.toContain('let value of values');
      });

      it('zone.js(es5) should not contain source map comment', () => {
        expect(shx.cat('zone.js')).not.toContain('sourceMappingURL');
      });
    });

    describe('es2015', () => {
      it('zone-evergreen.js(es2015) should contain es6 code', () => {
        expect(shx.cat('zone-evergreen.js')).toContain('let value of values');
      });
      it('zone.js(es5) should not contain source map comment', () => {
        expect(shx.cat('zone-evergreen.js')).not.toContain('sourceMappingURL');
      });
    });

    describe('dist file list', () => {
      it('should contain all files', () => {
        const list = shx.ls('./').stdout.split('\n').sort().slice(1);
        const expected = [
          'async-test.js',
          'async-test.min.js',
          'fake-async-test.js',
          'fake-async-test.min.js',
          'jasmine-patch.js',
          'jasmine-patch.min.js',
          'long-stack-trace-zone.js',
          'long-stack-trace-zone.min.js',
          'mocha-patch.js',
          'mocha-patch.min.js',
          'proxy.js',
          'proxy.min.js',
          'sync-test.js',
          'sync-test.min.js',
          'task-tracking.js',
          'task-tracking.min.js',
          'webapis-media-query.js',
          'webapis-media-query.min.js',
          'webapis-notification.js',
          'webapis-notification.min.js',
          'webapis-rtc-peer-connection.js',
          'webapis-rtc-peer-connection.min.js',
          'webapis-shadydom.js',
          'webapis-shadydom.min.js',
          'wtf.js',
          'wtf.min.js',
          'zone_externs.js',
          'zone-bluebird.js',
          'zone-bluebird.min.js',
          'zone-error.js',
          'zone-error.min.js',
          'zone-evergreen.js',
          'zone-evergreen.min.js',
          'zone-evergreen-testing-bundle.js',
          'zone-evergreen-testing-bundle.min.js',
          'zone-legacy.js',
          'zone-legacy.min.js',
          'zone-mix.js',
          'zone-mix.min.js',
          'zone-node.js',
          'zone-node.min.js',
          'zone-patch-canvas.js',
          'zone-patch-canvas.min.js',
          'zone-patch-cordova.js',
          'zone-patch-cordova.min.js',
          'zone-patch-electron.js',
          'zone-patch-electron.min.js',
          'zone-patch-fetch.js',
          'zone-patch-fetch.min.js',
          'zone-patch-jsonp.js',
          'zone-patch-jsonp.min.js',
          'zone-patch-message-port.js',
          'zone-patch-message-port.min.js',
          'zone-patch-promise-test.js',
          'zone-patch-promise-test.min.js',
          'zone-patch-resize-observer.js',
          'zone-patch-resize-observer.min.js',
          'zone-patch-rxjs-fake-async.js',
          'zone-patch-rxjs-fake-async.min.js',
          'zone-patch-rxjs.js',
          'zone-patch-rxjs.min.js',
          'zone-patch-socket-io.js',
          'zone-patch-socket-io.min.js',
          'zone-patch-user-media.js',
          'zone-patch-user-media.min.js',
          'zone-testing-bundle.js',
          'zone-testing-bundle.min.js',
          'zone-testing-node-bundle.js',
          'zone-testing-node-bundle.min.js',
          'zone-testing.js',
          'zone-testing.min.js',
          'zone.js',
          'zone.js.d.ts',
          'zone.api.extensions.ts',
          'zone.configurations.api.ts',
          'zone.min.js',
        ].sort();
        expect(list.length).toBe(expected.length);
        for (let i = 0; i < list.length; i++) {
          expect(list[i]).toEqual(expected[i]);
        }
      });
    });
  });
});

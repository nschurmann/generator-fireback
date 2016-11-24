const crypto = require('crypto')
import * as mongoose from 'mongoose'
const { Schema } = mongoose

const authTypes = ['local']

export interface IUser extends mongoose.Document {
  _id: any
  name: string
  email: string
  role: string
  password: string
  provider: string
  salt: string
}


const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
  },
  provider: String,
  salt: String
})

/**
 * Virtuals
 */

// Public profile information
UserSchema
  .virtual('profile')
  .get(() => {
    return {
      'name': this.name,
      'role': this.role,
    }
  })

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(() => {
    return {
      '_id': this._id,
      'role': this.role
    }
  })

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate((email: string) => {
    return email.length
  }, 'Email cannot be blank')

// Validate empty password
UserSchema
  .path('password')
  .validate((password: string) => {
    return password.length
  }, 'Password cannot be blank')

var validatePresenceOf = (value: string | any[]) => value && value.length

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next: Function) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next()
    }

    if (!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'))
    }

    // Make salt with a callback
    this.makeSalt((saltErr: any, salt: any) => {
      if (saltErr) {
        return next(saltErr)
      }
      this.salt = salt
      this.encryptPassword(this.password, (encryptErr: any, hashedPassword: string) => {
        if (encryptErr) {
          return next(encryptErr)
        }
        this.password = hashedPassword
        next()
      })
    })
  })

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password: string, callback: Function) {
    if (!callback) {
      return this.password === this.encryptPassword(password)
    }

    this.encryptPassword(password, (err: any, pwdGen: any) => {
      if (err) {
        return callback(err)
      }

      if (this.password === pwdGen) {
        callback(null, true)
      } else {
        callback(null, false)
      }
    })
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize: any, callback: Function): any {
    var defaultByteSize = 16

    if (typeof arguments[0] === 'function') {
      callback = arguments[0]
      byteSize = defaultByteSize
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1]
    }

    if (!byteSize) {
      byteSize = defaultByteSize
    }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64')
    }

    return crypto.randomBytes(byteSize, (err: any, salt: any) => {
      if (err) {
        callback(err)
      } else {
        callback(null, salt.toString('base64'))
      }
    })
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password: string, callback: Function) {
    if (!password || !this.salt) {
      if (!callback) {
        return null
      } else {
        return callback('Missing password or salt')
      }
    }

    const defaultIterations = 10000
    const defaultKeyLength = 64
    const salt = new Buffer(this.salt, 'base64')

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
        .toString('base64')
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err: any, key: any) => {
      if (err) {
        callback(err)
      } else {
        callback(null, key.toString('base64'))
      }
    })
  }
}

export default mongoose.model<IUser>('User', UserSchema)